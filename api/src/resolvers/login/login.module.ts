import { Module } from '@nestjs/common';

import { LoginResolver } from './login.resolver';
import { AuthService } from '../../services/auth.service';
import { DatabaseModule } from '../../database/database.module';
import { ConfigModule } from '../../config/config.module';

@Module({
  imports: [ DatabaseModule, ConfigModule ],
  providers: [
    LoginResolver,
    AuthService,
  ]
})

export class LoginModule {}
