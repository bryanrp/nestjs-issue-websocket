import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('test')
  handleTest() {
    return true;
  }

  @SubscribeMessage('server')
  handleServer() {
    return this.server instanceof Server;
  }
}
