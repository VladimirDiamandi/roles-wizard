import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './users/user.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService, private readonly userService: UserService) {}

  @Get('seed')
  async seed() {
    this.appService.seed();
    return { message: "database seeded"};
  }

  @Get('users')
  async findAllUsers() {
    return this.userService.findAll();
  }
}