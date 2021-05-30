import { UsePipes } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { nanoid } from 'nanoid';
import { Server, Socket } from 'socket.io';

import { CreateRoomDto } from './dtos/create-room.dto';
import { JoinRoom } from './dtos/join-room.dto';
import { RedisCacheService } from './redis-cache/redis-cache.service';
import { RoomDetails, User } from './types/roomDetails';

import { avatars } from './constants/avatar';
import { CreateRoomValidationPipe } from './pipes/create-room-validation.pipe';
import { JoinRoomValidationPipe } from './pipes/join-room-validation.pipe';
import { CallerDto } from './dtos/caller.dto';
import { CallerValidationPipe } from './pipes/caller.pipe';
import { SwitchDeviceDto } from './dtos/switchDevice.dto';
import { SendMessageDto } from './dtos/send-message.dto';

@WebSocketGateway({})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(readonly redisCacheService: RedisCacheService) {}
  @WebSocketServer()
  private wss: Server;

  @SubscribeMessage('create-room')
  @UsePipes(new CreateRoomValidationPipe())
  async handleCreateRoom(client: Socket, payload: CreateRoomDto) {
    const roomId = await this.generateRoomId();
    this.redisCacheService.set(
      roomId,
      JSON.stringify({
        password: payload.password || '',
        creator: client.id,
        users: [],
      }),
    );
    client.emit('create-room-successfully', {
      roomId,
    });
  }

  @SubscribeMessage('join-room')
  @UsePipes(new JoinRoomValidationPipe())
  async handleJoinRoom(client: Socket, payload: JoinRoom) {
    const { roomId, name, password } = payload;
    const room = JSON.parse(
      await this.redisCacheService.get(roomId),
    ) as RoomDetails;

    if (!room) client.emit('join-room-fail');
    else if (room.password && room.creator !== client.id && !password) {
      client.emit('require-password');
    } else if (
      room.password &&
      room.creator !== client.id &&
      password &&
      password != room.password
    ) {
      client.emit('wrong-password');
    } else {
      const avatar = this.randomAvatar();
      room.users.push({
        name: name,
        id: client.id,
        avatar,
        mic: false,
        camera: false,
      });
      await this.redisCacheService.set(roomId, JSON.stringify(room));
      const roomIds = JSON.parse(
        await this.redisCacheService.get(client.id),
      ) as string[];
      roomIds.push(roomId);
      await this.redisCacheService.set(client.id, JSON.stringify(roomIds));

      client.join(roomId);
      client.emit('join-room-successfully', {
        users: room.users,
      });
      client.to(roomId).emit('new-member', {
        name: name,
        id: client.id,
        avatar,
      });
    }
  }

  @SubscribeMessage('ready-call-audio')
  @UsePipes(new CallerValidationPipe())
  async handleAudioCaller(client: Socket, payload: CallerDto) {
    await this.authenticate(client.id, payload.roomId);
    client.to(payload.roomId).emit(`new-user-ready-call-audio_${client.id}`, {
      signal: payload.signal,
    });
  }

  @SubscribeMessage('ready-call-video')
  @UsePipes(new CallerValidationPipe())
  async handleVideoCaller(client: Socket, payload: CallerDto) {
    await this.authenticate(client.id, payload.roomId);
    client.to(payload.roomId).emit(`new-user-ready-call-video_${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    const roomIds = JSON.parse(
      await this.redisCacheService.get(client.id),
    ) as string[];
    for (const roomId of roomIds) {
      const room = JSON.parse(
        await this.redisCacheService.get(roomId),
      ) as RoomDetails;
      room.users.splice(
        room.users.findIndex((user) => user.id === client.id),
        1,
      );
      if (room.users.length === 0) this.redisCacheService.del(roomId);
      else this.redisCacheService.set(roomId, JSON.stringify(room));
      client.to(roomId).emit('leave-room', { userId: client.id });
    }
    this.redisCacheService.del(client.id);
  }

  @SubscribeMessage('switch-device')
  async handleSwitchDevice(client: Socket, payload: SwitchDeviceDto) {
    const { room, userIndex } = await this.authenticate(
      client.id,
      payload.roomId,
    );

    room.users[userIndex][payload.type] = payload.enabled;
    await this.redisCacheService.set(payload.roomId, JSON.stringify(room));

    client.to(payload.roomId).emit('switch-device', {
      userId: client.id,
      type: payload.type,
      enabled: payload.enabled,
    });
  }

  @SubscribeMessage('send-message')
  async handleSendMessage(client: Socket, payload: SendMessageDto) {
    const { room, userIndex } = await this.authenticate(
      client.id,
      payload.roomId,
    );
    const message = {
      senderId: client.id,
      sender: room.users[userIndex].name,
      avatar: room.users[userIndex].avatar,
      id: payload.id,
      content: payload.content,
      time: new Date(),
      type: 'text',
    };
    client.to(payload.roomId).emit('new-message', message);
  }

  handleConnection(client: Socket) {
    client.emit('connected');
    this.redisCacheService.set(client.id, JSON.stringify([]));
  }

  private async generateRoomId() {
    let isOk = false;
    let roomId = '';
    while (!isOk) {
      roomId = nanoid(32);
      const room = await this.redisCacheService.get(roomId);
      if (!room) isOk = true;
    }
    return roomId;
  }

  private randomAvatar(): string {
    return avatars[Math.floor(Math.random() * avatars.length)];
  }

  private async authenticate(
    userId: string,
    roomId: string,
  ): Promise<{
    room: RoomDetails;
    userIndex: number;
  }> {
    const room: RoomDetails = JSON.parse(
      await this.redisCacheService.get(roomId),
    );
    if (!room) throw new WsException({ message: 'Room Not Found' });
    const userIndex = room.users.findIndex((user) => user.id === userId);
    if (userIndex < 0) throw new WsException({ message: 'Not Authorized' });
    return {
      room,
      userIndex,
    };
  }
}
