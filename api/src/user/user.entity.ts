import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @CreateDateColumn()
  createdAt: Date;
}
