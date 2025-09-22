import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1758502186060 implements MigrationInterface {
    name = 'Initial1758502186060'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`historico_plan\` DROP FOREIGN KEY \`FK_ffb49f865fec2ed469cf547686a\``);
        await queryRunner.query(`ALTER TABLE \`historico_plan\` ADD CONSTRAINT \`FK_ffb49f865fec2ed469cf547686a\` FOREIGN KEY (\`plan_id_plan\`) REFERENCES \`plan\`(\`id_plan\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`historico_plan\` DROP FOREIGN KEY \`FK_ffb49f865fec2ed469cf547686a\``);
        await queryRunner.query(`ALTER TABLE \`historico_plan\` ADD CONSTRAINT \`FK_ffb49f865fec2ed469cf547686a\` FOREIGN KEY (\`plan_id_plan\`) REFERENCES \`plan\`(\`id_plan\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
