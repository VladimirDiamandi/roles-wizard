import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Role } from './role.entity';
import { Posts } from './post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 150 })
  email: string;

  @Column({ length: 150 })
  password: string;

  @ManyToOne(type => Role, role => role.users)
    role: Role;

  @OneToMany(type => Posts, posts => posts.user)
    posts: Posts[];
};