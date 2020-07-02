import { Injectable, Inject, Post } from '@nestjs/common';
import { Repository, getConnection } from 'typeorm';
import { User } from '../schemas/user.entity';
import { Posts } from '../schemas/post.entity';

@Injectable()
export class PostService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('POST_REPOSITORY')
    private postRepository: Repository<Posts>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(text: string, userId: number): Promise<Posts> {
    const post = this.postRepository.create();
    const user = await this.userRepository.findOne({id: userId});
    post.text = text;
    post.user = user;
    return await this.postRepository.save(post);
  }
}