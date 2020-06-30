import { createConnection } from 'typeorm';
import { ConfigService } from '../config/config.service';

const config = new ConfigService('.env');

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
      type: 'mysql',
      host: config.get('DB_HOST'),
      port: 3306,
      username: config.get('DB_USER'),
      password: config.get('DB_PASSWORD'),
      database: config.get('DB_NAME'),
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