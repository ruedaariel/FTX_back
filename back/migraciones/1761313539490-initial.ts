import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1761313539490 implements MigrationInterface {
    name = 'Initial1761313539490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`rutina\` CHANGE \`estado_rutina\` \`estado_rutina\` enum ('activa', 'finalizada', 'proxima', 'en proceso', 'completa') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`rutina\` CHANGE \`estado_rutina\` \`estado_rutina\` enum ('activa', 'finalizada', 'proxima', 'en proceso') NOT NULL`);
    }

}
