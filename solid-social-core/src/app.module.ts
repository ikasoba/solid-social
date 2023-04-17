import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./v1/users/users.entity";
import { ConfigModule } from "@nestjs/config";
import { getAppConfig } from "./app.config";
import { V1ApiModule } from "./v1/v1api.module";
import { PassportModule } from "@nestjs/passport";
import { PostEntity } from "./v1/posts/posts.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "./db.sqlite3",
      synchronize: true,
      entities: [UserEntity, PostEntity],
    }),
    ConfigModule.forRoot({
      load: [getAppConfig],
    }),
    PassportModule,
    V1ApiModule,
  ],
})
export class AppModule {}
