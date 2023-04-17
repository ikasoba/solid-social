import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class RoleEntity {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column({ type: "varchar", length: 36 })
  name: string;

  @Column({ type: "varchar", length: 512 })
  description: string;

  @Column({ type: "datetime" })
  createdAt: Date;
}
