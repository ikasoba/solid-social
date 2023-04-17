import { Column, Entity, PrimaryColumn } from "typeorm";

export enum Oauth2ClientType {
  CONFIDENTIAL = 0,
  PUBLIC,
}

@Entity()
export class Oauth2Client {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column({ type: "uuid" })
  authorId: string;

  @Column({ type: "blob" })
  secret: Buffer;

  @Column({ type: "int" })
  type: Oauth2ClientType;

  @Column({ type: "varchar", length: 36 })
  applicationName: string;

  @Column({ type: "varchar", length: 128, nullable: true })
  webSite?: string;

  @Column({ type: "varchar", length: 512, nullable: true })
  description?: string;

  @Column({ type: "text", nullable: true })
  iconUrl?: string;
}
