import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1757721313504 implements MigrationInterface {
    name = 'Initial1757721313504'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`historico_plan\` CHANGE \`f_cambio_fin\` \`f_cambio_fin\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`historico_plan\` CHANGE \`f_cambio_fin\` \`f_cambio_fin\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

}
