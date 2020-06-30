import { Injectable, Inject } from '@nestjs/common';
import { Repository, getConnection } from 'typeorm';
import { User } from '../schemas/user.entity';
import { Role } from '../schemas/role.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('ROLE_REPOSITORY')
    private roleRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async test(): Promise<User>{
    const connection = getConnection();
    const user = await this.userRepository.findOne({name: "John"});
    const role = await this.roleRepository.findOne({name: "writer"});
    user.role = role;
    await connection.manager.save(user);
    return user;
  }
}