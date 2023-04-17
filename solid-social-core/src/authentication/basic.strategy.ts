import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { BasicStrategy } from "passport-http";
import { Config } from "prettier";
import { AppConfig } from "src/app.config";
import { UsersService } from "src/v1/users/users.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class BasicAuthStrategy extends PassportStrategy(BasicStrategy) {
  constructor(
    @Inject(UsersService)
    private users: UsersService,
  ) {
    super();
  }

  async validate(userId: string, password: string) {
    const passwordHash = await this.users.getUserPasswordHashFromId(userId);
    if (
      passwordHash == null ||
      !(await bcrypt.compare(password, passwordHash))
    ) {
      throw new UnauthorizedException();
    }
    const user = await this.users.getUserFromId(userId);
    return user;
  }
}
