import {MigrationInterface, QueryRunner} from "typeorm";
import * as bcrypt from 'bcrypt';

export class users1593515678902 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const password1 = await bcrypt.hash("pass1", 10);
    const password2 = await bcrypt.hash("pass2", 10);
    await queryRunner.query(`INSERT INTO "user" (name, email, password) VALUES(("John", "john@mail.com", "${password1}"), ("Alex", "alex@mail.com", "${password2}"))`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM USER WHERE email in ("john@mail.com", "alex@mail.com")`);
  }

}
