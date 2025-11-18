import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1763476699091 implements MigrationInterface {
    name = 'Initial1763476699091'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`historico_plan\` ADD \`no_incluye\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`historico_plan\` ADD \`level\` smallint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`plan\` ADD \`no_incluye\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`plan\` ADD \`level\` smallint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`Pagos\` ADD \`fecha_vencimiento\` timestamp NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`idx_pagos_usuario_fecha\` ON \`Pagos\` (\`usuarioId\`, \`fecha_pago\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`idx_pagos_usuario_fecha\` ON \`Pagos\``);
        await queryRunner.query(`ALTER TABLE \`Pagos\` DROP COLUMN \`fecha_vencimiento\``);
        await queryRunner.query(`ALTER TABLE \`plan\` DROP COLUMN \`level\``);
        await queryRunner.query(`ALTER TABLE \`plan\` DROP COLUMN \`no_incluye\``);
        await queryRunner.query(`ALTER TABLE \`historico_plan\` DROP COLUMN \`level\``);
        await queryRunner.query(`ALTER TABLE \`historico_plan\` DROP COLUMN \`no_incluye\``);
    }

}
