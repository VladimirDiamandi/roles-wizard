import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { userProviders } from '../schemas/user.providers';
import { roleProviders } from '../schemas/role.providers';
import { postProviders } from '../schemas/post.providers';

@Module({
  providers: [
    ...databaseProviders,
    ...userProviders,
		...roleProviders,
		...postProviders,
  ],
  exports: [
    ...databaseProviders,
    ...userProviders,
		...roleProviders,
		...postProviders,
  ],
})
export class DatabaseModule {}