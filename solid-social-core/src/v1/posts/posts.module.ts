import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostEntity } from "./posts.entity";
import { PostsContoller } from "./posts.controller";
import { PostsService } from "./posts.service";
import { PassportModule } from "@nestjs/passport";
import { BasicAuthStrategy } from "src/authentication/basic.strategy";
import { UsersModule } from "../users/users.module";
import { TimelineModule } from "../timeline/timeline.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    PassportModule,
    UsersModule,
    TimelineModule,
  ],
  controllers: [PostsContoller],
  providers: [PostsService, BasicAuthStrategy],
})
export class PostsModule {}
