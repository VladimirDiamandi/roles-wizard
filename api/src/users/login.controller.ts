import { Controller, Post, Body, Inject} from '@nestjs/common';
import { Repository, getConnection } from 'typeorm';
import { User } from '../schemas/user.entity';

import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';

@Controller('api/login')
export class LoginController {
  constructor(
      private authService: AuthService,
      @Inject('USER_REPOSITORY')
      private userRepository: Repository<User>,
    ) {
        
    }
  @Post()
  async login(@Body() loginDTO: User) {
    const user = await this.userRepository.findOne({
        email: loginDTO.email
    })
    if (!user) {
        return {
            error: "user not found"
        }
    }
    
    const isPasswordValid = await bcrypt.compare(loginDTO.password, user.password);
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