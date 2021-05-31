import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { RedisCacheModule } from './redis-cache/redis-cache.module';
import { FilesModule } from './files/files.module';
import { FilesGateway } from './files/files.gateway';

@Module({
  imports: [RedisCacheModule, FilesModule],
  controllers: [AppController],
  providers: [AppService, AppGateway, FilesGateway],
})
export class AppModule {}
