import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { RedisCacheModule } from './redis-cache/redis-cache.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [RedisCacheModule, FilesModule],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
