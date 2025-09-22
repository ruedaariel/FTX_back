import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1758501561673 implements MigrationInterface {
    name = 'Initial1758501561673'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`datospersonales\` DROP FOREIGN KEY \`FK_e8c31ddc16c8e5dfefe47d460ca\``);
        await queryRunner.query(`ALTER TABLE \`datospersonales\` ADD CONSTRAINT \`FK_e8c31ddc16c8e5dfefe47d460ca\` FOREIGN KEY (\`plan_id_plan\`) REFERENCES \`plan\`(\`id_plan\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`datospersonales\` DROP FOREIGN KEY \`FK_e8c31ddc16c8e5dfefe47d460ca\``);
        await queryRunner.query(`ALTER TABLE \`datospersonales\` ADD CONSTRAINT \`FK_e8c31ddc16c8e5dfefe47d460ca\` FOREIGN KEY (\`plan_id_plan\`) REFERENCES \`plan\`(\`id_plan\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
