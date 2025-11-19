import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1763566850504 implements MigrationInterface {
    name = 'Initial1763566850504'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Pagos\` ADD \`referencia\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Pagos\` DROP COLUMN \`referencia\``);
    }

}
