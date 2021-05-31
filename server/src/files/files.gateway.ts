import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

import { User } from 'src/types/roomDetails';

@WebSocketGateway({})
export class FilesGateway {
  @WebSocketServer()
  private wss: Server;

  async responseImageMessage(
    roomId: string,
    user: User,
    uri: string,
    id: string,
  ) {
    const message = {
      senderId: user.id,
      sender: user.name,
      avatar: user.avatar,
      id,
      content: uri,
      time: new Date(),
      type: 'image',
    };
    this.wss.in(roomId).emit('new-message', message);
  }
}
