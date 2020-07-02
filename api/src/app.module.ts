 
import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';

import { AppController } from './app.controller';
import { userProviders } from './schemas/user.providers';
import { roleProviders } from './schemas/role.providers';
import { postProviders } from './schemas/post.providers';
import { AppService } from './app.service';
import { UserService } from './users/user.service';
import { AuthService } from './users/auth.service';
import { PostService } from './posts/post.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { DatabaseModule } from './database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { LoginResolver } from './users/login.resolver';
import { PostResolver } from './posts/post.resolver';

const config = new ConfigService('.env');
const batabaseUrl = config.get('DB_URL') + ':' + config.get('DB_PORT') + '/' + config.get('DB_NAME');


@Module({
  imports: [ConfigModule, DatabaseModule, 
	GraphQLModule.forRoot({
		autoSchemaFile: 'schema.gql',
		playground: true,
		definitions: {
			path: join(process.cwd(), 'src/graphql.ts'),
			outputAs: 'class',
		},
		installSubscriptionHandlers: true,
		context: ({req}) => ({req}),
		debug: (process.env.NODE_ENV || 'dev') !== 'prod',
	  }),
],
  controllers: [ AppController ],
  providers: [
		AppService,
		...userProviders,
		...roleProviders,
		...postProviders,
		UserService,
		AuthService,
		PostService,
		LoginResolver,
		PostResolver
	],
})

export class AppModule {}