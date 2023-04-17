import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { UserEntity } from "../users/users.entity";

@Entity()
export class PostEntity {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column({ type: "varchar", length: 512 })
  content: string;

  @Column({ type: "datetime" })
  createdAt: Date;

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "authorId", referencedColumnName: "id" })
  readonly author?: UserEntity;
}
