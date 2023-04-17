import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { BasicAuthStrategy } from "src/authentication/basic.strategy";
import { TimelineService } from "./timeline.service";
import { TimeLineController } from "./timeline.controller";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [PassportModule, UsersModule],
  controllers: [TimeLineController],
  providers: [BasicAuthStrategy, TimelineService],
  exports: [TimelineService],
})
export class TimelineModule {}
