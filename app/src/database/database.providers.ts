import { createConnection } from 'typeorm';
import { ConfigService } from '../config/config.service';

const config = new ConfigService('.env');

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'wizard',
      password: 'password123',
      database: 'wizard',
      entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
      ],
      synchronize: true,
      "migrationsTableName": "migrations",
      "migrations": ["migration/*.js"],
      "cli": {
          "migrationsDir": "migration"
      }
    }),
  },
];