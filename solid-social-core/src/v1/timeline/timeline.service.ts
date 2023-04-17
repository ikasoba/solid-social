import { Inject, Injectable } from "@nestjs/common";
import { TimelineEntity } from "./timeline.entity";
import { PostEntity } from "../posts/posts.entity";

@Injectable()
export class TimelineService {
  private timelines: Map<string, TimelineEntity> = new Map();

  add(userId: string, ...posts: PostEntity[]): void {
    const timeline =
      this.timelines.get(userId) ??
      (this.timelines.set(userId, []) && this.timelines.get(userId)!);
    if (timeline.length + posts.length > 100) {
      timeline.splice(0, Math.max(timeline.length - posts.length, -1));
    }
    timeline.unshift(...posts);
  }

  get(userId: string): PostEntity[] {
    const timeline =
      this.timelines.get(userId) ??
      (this.timelines.set(userId, []) && this.timelines.get(userId)!);
    return timeline;
  }
}
