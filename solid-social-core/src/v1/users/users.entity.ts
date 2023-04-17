import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class UserEntity {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column({ type: "varchar", length: 36 })
  name: string;

  @Column({ type: "text", select: false })
  passwordHash: string;

  @Column({ type: "datetime" })
  createdAt: Date;
}
