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
import { SwitchDeviceDto } from './dtos/switchDevice.dto';
import { SendMessageDto } from './dtos/send-message.dto';
import { CallerDto } from './dtos/caller.dto';
import { RemoveMessageDto } from './dtos/remove-message.dto';

import { RedisCacheService } from './redis-cache/redis-cache.service';
import { RoomDetails } from './types/roomDetails';

import { avatars } from './constants/avatar';

import { CreateRoomValidationPipe } from './pipes/create-room-validation.pipe';
import { JoinRoomValidationPipe } from './pipes/join-room-validation.pipe';
import { CallerValidationPipe } from './pipes/caller.pipe';
import { RemoveMessageValidationPipe } from './pipes/remove-message.pipe';
import { SendMessageValidationPipe } from './pipes/send-message.pipe';
import { SwitchDeviceValidationPipe } from './pipes/switch-device.pipe';
import { AppService } from './app.service';
import { FilesService } from './files/files.service';
import { RequestSharingScreen } from './dtos/request-sharing-screen.dto';
import { RequestSharingScreenValidationPipe } from './pipes/request-sharing-screen.pipe';

@WebSocketGateway({})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly redisCacheService: RedisCacheService,
    private readonly appService: AppService,
    private readonly fileServices: FilesService,
  ) {}
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
        sharingScreen: room.sharingScreen,
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
    const { room } = await this.appService.authenticateWs(
      client.id,
      payload.roomId,
    );
    if (room.users.length > 1) {
      this.wss
        .to(payload.userId)
        .emit(`new-user-ready-call-audio_${client.id}`, {
          userId: client.id,
          signal: payload.signal,
        });
    }
  }

  @SubscribeMessage('switch-device')
  @UsePipes(new SwitchDeviceValidationPipe())
  async handleSwitchDevice(client: Socket, payload: SwitchDeviceDto) {
    const { room, userIndex } = await this.appService.authenticateWs(
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

  @SubscribeMessage('request-sharing-screen')
  @UsePipes(new RequestSharingScreenValidationPipe())
  async handleRequestSharingScreen(
    client: Socket,
    payload: RequestSharingScreen,
  ) {
    const { room, userIndex } = await this.appService.authenticateWs(
      client.id,
      payload.roomId,
    );
    if (room.sharingScreen)
      throw new WsException({ message: 'One member is sharing!' });

    room.sharingScreen = {
      status: true,
      user: room.users[userIndex],
    };
    await this.redisCacheService.set(payload.roomId, JSON.stringify(room));
    client.to(payload.roomId).emit('request-sharing-screen', {
      userId: client.id,
    });
  }

  @SubscribeMessage('stop-sharing-screen')
  @UsePipes(new RequestSharingScreenValidationPipe())
  async handleStopSharingScreen(client: Socket, payload: RequestSharingScreen) {
    const { room } = await this.appService.authenticateWs(
      client.id,
      payload.roomId,
    );
    if (!room.sharingScreen || room.sharingScreen.user.id !== client.id)
      throw new WsException({ message: 'Bad request!' });

    room.sharingScreen = undefined;
    await this.redisCacheService.set(payload.roomId, JSON.stringify(room));
    client.to(payload.roomId).emit('stop-sharing-screen');
  }

  @SubscribeMessage('send-message')
  @UsePipes(new SendMessageValidationPipe())
  async handleSendMessage(client: Socket, payload: SendMessageDto) {
    const { room, userIndex } = await this.appService.authenticateWs(
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

  @SubscribeMessage('remove-message')
  @UsePipes(new RemoveMessageValidationPipe())
  async handleRemoveMessage(client: Socket, payload: RemoveMessageDto) {
    await this.appService.authenticateWs(client.id, payload.roomId);
    client.to(payload.roomId).emit('remove-message', {
      messageId: payload.messageId,
      userId: client.id,
    });
  }

  handleConnection(client: Socket) {
    client.emit('connected');
    this.redisCacheService.set(client.id, JSON.stringify([]));
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
      if (room.sharingScreen?.user.id === client.id)
        room.sharingScreen = undefined;
      if (room.users.length === 0) {
        this.redisCacheService.del(roomId);
        try {
          this.fileServices.deleteFolder(roomId);
        } catch (e) {}
      } else {
        this.redisCacheService.set(roomId, JSON.stringify(room));
        client.to(roomId).emit('leave-room', { userId: client.id });
      }
    }
    this.redisCacheService.del(client.id);
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
}
