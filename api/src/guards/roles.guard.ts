import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { AuthService } from '../users/auth.service';
import { User } from '../schemas/user.entity';
import { Role } from '../schemas/role.entity';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('ROLE_REPOSITORY')
    private roleRepository: Repository<Role>,
    private readonly auth: AuthService,
    private reflector: Reflector
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log('ROLES', roles);
    return this.validateRequest(request, roles);
  }

  async validateRequest(req, roles) {
    try {
      const token = await this.auth.verifyToken(req.headers.authorization);
      const user = await this.userRepository.findOne({id: token.id}, {relations: ['role']});
      if (!user || !user.role) {
        return false;
      }
      return roles.includes(user.role.name);
    } catch(error) {
      return false;
    }
  }
}