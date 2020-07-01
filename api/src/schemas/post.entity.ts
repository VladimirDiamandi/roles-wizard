import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 250 })
  text: string;

  @ManyToOne(type => User, user => user.posts)
    user: User;
};