import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { UserEntity } from "../users/users.entity";
import { AuthGuard } from "@nestjs/passport";

@Controller("/v1/posts")
export class PostsContoller {
  constructor(private posts: PostsService) {}

  @Get("/:id")
  getPostFromId(@Param("id", new ParseUUIDPipe({ version: "4" })) id: string) {
    return this.posts.getPostFromId(id);
  }

  @Post("/create")
  @UseGuards(AuthGuard("basic"))
  createPost(
    @Req() req: { user: UserEntity },
    @Body("content") content: string,
  ) {
    return this.posts.createPost(content, req.user);
  }
}
