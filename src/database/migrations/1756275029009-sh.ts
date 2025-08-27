import { MigrationInterface, QueryRunner } from 'typeorm';

export class Sh1756275029009 implements MigrationInterface {
  name = 'Sh1756275029009';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" ADD "description" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "description"`);
  }
}
