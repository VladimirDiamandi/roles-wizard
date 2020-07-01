import {MigrationInterface, QueryRunner} from "typeorm";

export class RoleMigration implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO "role" (name) VALUES(("writer"), ("reader))`);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM ROLE WHERE "name" in ("writer", "reader")`);
  }
}
