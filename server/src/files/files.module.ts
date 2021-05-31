import { Module } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { RedisCacheModule } from 'src/redis-cache/redis-cache.module';
import { FilesController } from './files.controller';
import { FilesGateway } from './files.gateway';
import { FilesService } from './files.service';

@Module({
  imports: [RedisCacheModule],
  controllers: [FilesController],
  providers: [FilesService, AppService, FilesGateway],
})
export class FilesModule {}
