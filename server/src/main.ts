import { config } from 'dotenv';

if (process.env.ENV !== 'production') {
  config();
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SocketIoAdapter } from './socket-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new SocketIoAdapter(app, true));
  // app.setGlobalPrefix('api');
  await app.listen(process.env.APP_PORT);
}
bootstrap();
