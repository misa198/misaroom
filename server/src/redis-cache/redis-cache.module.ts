import { Module, CacheModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
// import { RedisCacheService } from './redisCache.service';
import { RedisCacheService } from './redis-cache.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get(process.env.REDIS_HOST),
        port: configService.get(process.env.REDIS_PORT),
      }),
    }),
  ],
  providers: [RedisCacheService],
  // providers: [RedisCacheService],
  // exports: [RedisCacheService], // This is IMPORTANT,  you need to export RedisCacheService here so that other modules can use it
})
export class RedisCacheModule {}
