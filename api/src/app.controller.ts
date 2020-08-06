import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('seed')
  async seed() {
    this.appService.seed();
    return { message: "database seeded"};
  }
}
