import { Redis } from "ioredis";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RedisService extends Redis {}
