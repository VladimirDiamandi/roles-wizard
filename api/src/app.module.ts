 
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './services/auth.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { DatabaseModule } from './database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { PostModule } from './resolvers/posts/post.module';
import { LoginModule } from './resolvers/login/login.module';

const config = new ConfigService('.env');
const batabaseUrl = config.get('DB_URL') + ':' + config.get('DB_PORT') + '/' + config.get('DB_NAME');


@Module({
  imports: [
    ConfigModule,
    DatabaseModule, 
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
    PostModule,
    LoginModule,
  ],
  controllers: [ AppController ],
  providers: [
		AppService,
		AuthService,
  ],
})

export class AppModule {}