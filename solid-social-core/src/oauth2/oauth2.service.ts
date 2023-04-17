import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Oauth2Client } from "./oauth2-client.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class Oauth2Service {
  constructor(
    @InjectRepository(Oauth2Client) private clients: Repository<Oauth2Client>,
  ) {}

  registerClient(client: Omit<Oauth2Client, "id" | "secret">) {
    this.clients.insert({
      ...client,
      id: crypto.randomUUID(),
      secret: crypto.getRandomValues(Buffer.alloc(128)),
    } satisfies Oauth2Client);
  }
}
