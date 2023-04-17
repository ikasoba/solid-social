import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./users.entity";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { AppConfig } from "src/app.config";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private users: Repository<UserEntity>,
    @Inject(ConfigService)
    private config: ConfigService<AppConfig>,
  ) {}

  getUserFromId(userid: string): Promise<UserEntity | null> {
    return this.users.findOne({
      where: { id: userid },
    });
  }

  async getUserPasswordHashFromId(userid: string): Promise<string | null> {
    return (
      (
        await this.users.findOne({
          where: { id: userid },
          select: ["passwordHash"],
        })
      )?.passwordHash ?? null
    );
  }

  findUserFromName(username: string): Promise<UserEntity | null> {
    return this.users.findOne({
      where: { name: username },
    });
  }

  findUsersFromName(
    username: string,
    take = 50,
    skip = 0,
  ): Promise<UserEntity[]> {
    return this.users.find({
      where: { name: username },
      order: { createdAt: "DESC" },
      skip: skip,
      take: take,
    });
  }

  async createUser(
    name: string,
    password: string,
    createdAt = new Date(),
  ): Promise<UserEntity> {
    const user: UserEntity = {
      id: crypto.randomUUID(),
      name: name,
      passwordHash: await bcrypt.hash(password, this.config.get("saltRounds")!),
      createdAt: createdAt,
    };
    await this.users.insert(user);
    return user;
  }
}
