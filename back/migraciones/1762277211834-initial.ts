import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1762277211834 implements MigrationInterface {
    name = 'Initial1762277211834'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`historico_plan\` ADD \`beneficios\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`plan\` ADD \`beneficios\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`plan\` DROP COLUMN \`beneficios\``);
        await queryRunner.query(`ALTER TABLE \`historico_plan\` DROP COLUMN \`beneficios\``);
    }

}
