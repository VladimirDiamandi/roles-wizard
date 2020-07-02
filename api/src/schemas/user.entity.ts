import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Role } from './role.entity';
import { Posts } from './post.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 150 })
  name: string;

  @Field()
  @Column({ length: 150 })
  email: string;

  @Field()
  @Column({ length: 150 })
  password: string;

  @ManyToOne(type => Role, role => role.users)
    role: Role;

  @OneToMany(type => Posts, posts => posts.user)
    posts: Posts[];
};