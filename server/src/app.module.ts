import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { RedisCacheModule } from './redis-cache/redis-cache.module';
import { FilesModule } from './files/files.module';
import { FilesGateway } from './files/files.gateway';
import { FilesService } from './files/files.service';

@Module({
  imports: [
    RedisCacheModule,
    FilesModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'build'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway, FilesGateway, FilesService],
})
export class AppModule {}
