import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Oauth2Client } from "./oauth2-client.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Oauth2Client])],
})
export class Oauth2Module {}
