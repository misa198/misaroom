import { config } from 'dotenv';
config();

import { NestFactory } from '@nestjs/core';
import { RedisIoAdapter } from './redis-io-adapter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new RedisIoAdapter(app));
  app.setGlobalPrefix('api');
  await app.listen(process.env.APP_PORT);
}
bootstrap();
