import { Injectable, UnauthorizedException } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { RedisCacheService } from './redis-cache/redis-cache.service';
import { RoomDetails, User } from './types/roomDetails';

@Injectable()
export class AppService {
  constructor(private readonly redisCacheService: RedisCacheService) {}

  public async authenticateWs(
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

  public async authenticate(
    userId: string,
    roomId: string,
  ): Promise<{
    room: RoomDetails;
    user: User;
  }> {
    const room: RoomDetails = JSON.parse(
      await this.redisCacheService.get(roomId),
    );
    if (!room) throw new UnauthorizedException({ message: 'Room Not Found' });
    const userIndex = room.users.findIndex((user) => user.id === userId);
    if (userIndex < 0)
      throw new UnauthorizedException({ message: 'Not Authorized' });
    return {
      room,
      user: room.users[userIndex],
    };
  }
}
