import { Namespace } from 'socket.io';
import { RedisAdapter } from 'socket.io-redis';

export interface Wss extends Omit<Namespace, 'adapter'> {
  adapter: RedisAdapter;
}
