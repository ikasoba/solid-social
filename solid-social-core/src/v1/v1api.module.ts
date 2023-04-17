import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { V1ApiController } from "./v1api.controller";
import { PostsModule } from "./posts/posts.module";
import { TimelineModule } from "./timeline/timeline.module";

@Module({
  imports: [UsersModule, PostsModule, TimelineModule],
  controllers: [V1ApiController],
})
export class V1ApiModule {}
