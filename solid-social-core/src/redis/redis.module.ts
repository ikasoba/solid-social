import { DynamicModule } from "@nestjs/common";
import { Redis, RedisOptions } from "ioredis";
import { RedisService } from "./redis.service";

export class RedisModule {
  forRoot(options?: RedisOptions): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        {
          provide: RedisService,
          useFactory: () =>
            options ? new RedisService(options) : new RedisService(),
        },
      ],
      exports: [RedisService],
    };
  }
}
