import { Module } from '@nestjs/common';

import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { DatabaseModule } from '../../database/database.module';
import { AuthService } from '../../services/auth.service';
import { ConfigModule } from '../../config/config.module';

@Module({
  imports: [ DatabaseModule, ConfigModule ],
  providers: [
    PostResolver,
    PostService,
    AuthService,
  ]
})

export class PostModule {}
