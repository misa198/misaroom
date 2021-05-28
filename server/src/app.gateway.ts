import { UsePipes } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { nanoid } from 'nanoid';
import { Server, Socket } from 'socket.io';

import { CreateRoomDto } from './dtos/create-room.dto';
import { JoinRoom } from './dtos/join-room.dto';
import { RedisCacheService } from './redis-cache/redis-cache.service';
import { RoomDetails } from './types/roomDetails';

import { avatars } from './constants/avatar';
import { CreateRoomValidationPipe } from './pipes/create-room-validation.pipe';
import { JoinRoomValidationPipe } from './pipes/join-room-validation.pipe';

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
    }
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
    }

    this.redisCacheService.del(client.id);
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
}
