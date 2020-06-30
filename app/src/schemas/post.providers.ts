import { Connection } from 'typeorm';
import { Posts } from './post.entity';

export const postProviders = [
  {
    provide: 'POST_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Posts),
    inject: ['DATABASE_CONNECTION'],
  },
];