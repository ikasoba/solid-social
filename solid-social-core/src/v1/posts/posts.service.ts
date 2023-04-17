import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PostEntity } from "./posts.entity";
import { Repository } from "typeorm";
import { UserEntity } from "../users/users.entity";
import { TimelineService } from "../timeline/timeline.service";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private posts: Repository<PostEntity>,
    @Inject(TimelineService)
    private timelines: TimelineService,
  ) {}

  getPostFromId(id: string): Promise<PostEntity | null> {
    return this.posts.findOne({ where: { id: id } });
  }

  async createPost(
    content: string,
    author?: UserEntity,
    createdAt = new Date(),
  ): Promise<PostEntity> {
    const post: PostEntity = {
      id: crypto.randomUUID(),
      content: content,
      author: author,
      createdAt: createdAt,
    };
    await this.posts.insert(post);
    if (author) {
      this.timelines.add(author.id, post);
    }
    return post;
  }
}
