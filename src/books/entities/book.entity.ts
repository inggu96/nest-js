import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'book' })
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  deletedAt: Date;
}
