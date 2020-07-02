import { Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import * as bcrypt from 'bcrypt';
import { User } from '../schemas/user.entity';
import { Repository } from 'typeorm';

import { AuthService } from './auth.service';
import { LoginOut } from '../dto/login.out.dto';


@Resolver('Login')
export class LoginResolver {

  constructor(
    private authService: AuthService,
      @Inject('USER_REPOSITORY')
      private userRepository: Repository<User>,
  ) {}

  @Mutation(() => LoginOut)
  async login(@Args('email') email: string, @Args('password') password: string,) {
    const user = await this.userRepository.findOne({
        email
    })
    if (!user) {
      return {
        error: "user not found"
      }
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return {
            error: "user not found"
        }
    }

    return {
      message: 'login successfuly',
      token: await this.authService.createToken(user),
    }
  }
}