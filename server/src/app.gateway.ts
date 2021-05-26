import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { nanoid } from 'nanoid';
import { Socket } from 'socket.io';

import { CreateRoomDto } from './dtos/create-room.dto';
import { JoinRoom } from './dtos/join-room.dto';
import { RedisCacheService } from './redis-cache/redis-cache.service';
import { RoomDetails } from './types/roomDetails';
import { Wss } from './types/wss';

import { avatars } from './constants/avatar';

@WebSocketGateway({})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(readonly redisCacheService: RedisCacheService) {}
  @WebSocketServer()
  private wss: Wss;

  @SubscribeMessage('create-room')
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
  async handleJoinRoom(client: Socket, payload: JoinRoom) {
    const { roomId, name, password } = payload;
    const room = JSON.parse(
      await this.redisCacheService.get(roomId),
    ) as RoomDetails;
    console.log(room);
    if (!room)
      client.emit('join-room-fail', {
        message: 'Not found!',
      });
    else if (
      (room.password && room.creator !== client.id) ||
      (room.password !== password && room.creator !== client.id)
    ) {
      client.emit('require-password');
    } else {
      const avatar = this.randomAvatar();
      room.users.push({
        name: name,
        id: client.id,
        avatar,
      });
      await this.redisCacheService.set(roomId, JSON.stringify(room));
      client.emit('join-room-successfully', {
        users: room.users,
      });
    }
  }

  handleDisconnect(client: Socket) {
    console.log(client.rooms);
  }

  handleConnection(client: Socket) {
    console.log(client.id);
    client.emit('connected');
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
