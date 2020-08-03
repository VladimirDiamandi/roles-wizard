import { CanActivate, ExecutionContext, Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly auth: AuthService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const {req} = ctx.getContext();
    const payload = await this.auth.verifyToken(req.headers['authorization']);
    if (!payload) {
      throw new UnauthorizedException();
    }
    req.userId = await payload.id;
    return !!payload;
  }
}
