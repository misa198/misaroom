import { config } from 'dotenv';

if (process.env.ENV !== 'production') {
  config();
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // app.setGlobalPrefix('api');
  await app.listen(process.env.APP_PORT);
}
bootstrap();
