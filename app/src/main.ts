import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ConfigService } from './config/config.service';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as fs from 'fs';
import * as hbs from 'hbs';

const config = new ConfigService('.env');

async function bootstrap() {
  
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // app.setViewEngine('hbs');
  // loadComponents('auth');

  // const app = await NestFactory.create(AppModule);
  // app.setBaseViewsDir(join(__dirname, '/views'));
  // hbs.registerPartials(join(__dirname, '/views/partials'));
  // app.setViewEngine('hbs');
  app.useGlobalPipes(new ValidationPipe());
  // app.useStaticAssets(join(__dirname, '/src/views'))

  await app.listen(config.get('PORT'));
}
bootstrap();

// function loadComponents(pathName: string) {
//   const partialsDir = __dirname + `/views/${pathName}`;
//   const filenames = fs.readdirSync(partialsDir);

//   filenames.forEach(function (filename) {
//     var matches = /^([^.]+).hbs$/.exec(filename);
//     if (!matches) {
//       return;
//     }
//     const name = `${pathName}_${matches[1]}`;
//     const template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
//     hbs.registerPartial(name, template);
//   });

// }