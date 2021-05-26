import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class RoomsGateway {
  @WebSocketServer()
  wss: Server;

  handleConnection(client: Socket) {
    console.log(client.id);
    client.emit('connection', 'Successfully connected to server');
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    return 'Hello world!';
  }
}
