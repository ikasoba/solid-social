import { Controller, Get, Inject, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserEntity } from "../users/users.entity";
import { TimelineService } from "./timeline.service";

@Controller("/v1/timeline")
export class TimeLineController {
  constructor(
    @Inject(TimelineService)
    private timelines: TimelineService,
  ) {}

  @Get()
  @UseGuards(AuthGuard("basic"))
  getTimeline(@Req() req: { user: UserEntity }) {
    return this.timelines.get(req.user.id);
  }
}
