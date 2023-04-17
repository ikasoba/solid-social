import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserEntity } from "./users.entity";
import { ConfigService } from "@nestjs/config";

@Controller("/v1/users")
export class UsersController {
  constructor(private users: UsersService) {}

  @Get()
  async getUserFromName(
    @Query("name") name: string,
  ): Promise<UserEntity | null> {
    return await this.users.findUserFromName(name);
  }

  @Get("/:id")
  async getUserFromId(
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
  ): Promise<UserEntity | null> {
    return await this.users.getUserFromId(id);
  }

  @Get("/:id/roles")
  async getUserRoles(
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
  ): Promise<UserEntity | null> {
    return await this.users.getUserFromId(id);
  }

  @Post("/create")
  async createUser(
    @Body("name") name: string,
    @Body("password") password: string,
  ): Promise<UserEntity> {
    if (await this.users.findUserFromName(name)) {
      throw new HttpException(
        {
          error: "user already exists.",
        },
        400,
      );
    }
    return await this.users.createUser(name, password);
  }
}
