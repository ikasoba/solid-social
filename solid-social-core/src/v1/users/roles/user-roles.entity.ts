import { Column, Entity, Index, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "../users.entity";

@Entity()
@Index(["roleId", "userId"])
export class UserRoles {
  @PrimaryColumn({ type: "uuid" })
  roleId: string;

  @PrimaryColumn({ type: "uuid" })
  userId: string;
}
