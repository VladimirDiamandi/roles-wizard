import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { getConnection, Repository } from "typeorm";
import { User } from './schemas/user.entity';
import { Role } from './schemas/role.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {

  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('ROLE_REPOSITORY')
    private roleRepository: Repository<Role>,
    private config: ConfigService
  ) {

  }

  async seed() {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values([
          { name: "writer" },
          { name: "reader" }
      ]).execute();
    const writeRole = await this.roleRepository.findOne({name: 'writer'});
    const readRole = await this.roleRepository.findOne({name: 'reader'});
    const password1 = await bcrypt.hash("pass1", 10);
    const password2 = await bcrypt.hash("pass2", 10);

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
          { name: "John", email: 'john@mail.com', password: password1, role: writeRole},
          { name: "Alex", email: 'alex@mail.com', password: password2, role: readRole},
      ]).execute();
  }
}