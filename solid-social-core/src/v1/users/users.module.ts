import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./users.entity";
import { ConfigModule } from "@nestjs/config";
import { getAppConfig } from "src/app.config";
import { UsersService } from "./users.service";
import { UsersController } from "./users.contoller";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    ConfigModule.forFeature(getAppConfig),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
