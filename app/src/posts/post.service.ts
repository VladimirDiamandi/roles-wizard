import { Injectable, Inject } from '@nestjs/common';
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
}