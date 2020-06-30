import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { User } from '../schemas/user.entity';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthService {

  constructor(private config: ConfigService) {}
  
  async createToken(user: User) {
    const expiresIn = 60 * 60;
    const token = await jwt.sign({ id: user.id }, this.config.get('SECRET'), { expiresIn });
    return token;
  }

  async verifyToken(token: string) {
    return jwt.verify(token, this.config.get('SECRET'));
  }

}