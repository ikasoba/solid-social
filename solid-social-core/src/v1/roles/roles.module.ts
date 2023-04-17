import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature(), UsersModule],
})
export class RolesModule {}
