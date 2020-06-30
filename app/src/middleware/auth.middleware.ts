import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from '../users/auth.service';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  
  constructor(private readonly auth: AuthService, private config: ConfigService) {
    
  }

  async use(req: Request, res: Response, next: Function) {
    if (!req.headers.authorization) {
      return res.json(this.authFailed());
    }
    let token;
    try {
      token = await this.auth.verifyToken(req.headers.authorization);
      req['userId'] = token.id;
      next();

    } catch(error) {
      return res.json(this.authFailed());
    }
  }

  authFailed() {
    return {
      error: 'not authorized'
    }
  }
}