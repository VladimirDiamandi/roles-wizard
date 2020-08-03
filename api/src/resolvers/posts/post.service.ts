import { Injectable, Inject, Post } from '@nestjs/common';
import { Repository, getConnection } from 'typeorm';
import { User } from '../../schemas/user.entity';
import { Posts } from '../../schemas/post.entity';

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

  async getAll(userId: number): Promise<Posts[]> {
    const user = await this.userRepository.findOne({id: userId});
    return await this.postRepository.find({where: {user: user}}) || [];
  }

  async delete(id: number, userId: number): Promise<void> {
    const post = await this.postRepository.findOne({id}, {relations: ['user']});
    const user = await this.userRepository.findOne({id: userId});
    if (post.user.id !== user.id) {
      throw new Error('wrong user entity');
    }
    await this.postRepository.delete(id);
  }

  async edit(id: number, text:string, userId: number): Promise<Posts> {
    const post = await this.postRepository.findOne({id}, {relations: ['user']});
    const user = await this.userRepository.findOne({id: userId});
    if (post.user.id !== user.id) {
      throw new Error('wrong user entity');
    }
    post.text = text;
    return await this.postRepository.save(post);
  }
}