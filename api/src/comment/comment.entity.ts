import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userId: string;

  @Column({ nullable: true })
  parentId?: string;

  @Column({ nullable: true })
  page?: string;

  @Column()
  text: string;

  @CreateDateColumn()
  createdAt: Date;
}
