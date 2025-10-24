import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1761349934299 implements MigrationInterface {
    name = 'Initial1761349934299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ejercicio_rutina\` ADD \`ejercicio_hecho\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ejercicio_rutina\` DROP COLUMN \`ejercicio_hecho\``);
    }

}
