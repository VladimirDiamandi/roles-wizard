 
import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';

import { AppController } from './app.controller';
import { LoginController } from './users/login.controller';
import { PostController } from './posts/post.controller';
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
import { AuthMiddleware } from './middleware/auth.middleware';

const config = new ConfigService('.env');
const batabaseUrl = config.get('DB_URL') + ':' + config.get('DB_PORT') + '/' + config.get('DB_NAME');

@Module({
  imports: [ConfigModule, DatabaseModule],
  controllers: [AppController, LoginController, PostController],
  providers: [
		AppService,
		...userProviders,
		...roleProviders,
		...postProviders,
		UserService,
		AuthService,
		PostService
	],
})

export class AppModule implements NestModule{
	configure(consumer: MiddlewareConsumer) {
	  consumer
		.apply(AuthMiddleware)
		.forRoutes({ path: 'posts/', method: RequestMethod.ALL });
	}
}