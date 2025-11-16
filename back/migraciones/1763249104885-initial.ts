import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1763249104885 implements MigrationInterface {
    name = 'Initial1763249104885'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`historico_plan\` DROP COLUMN \`level\``);
        await queryRunner.query(`ALTER TABLE \`plan\` DROP COLUMN \`level\``);
        await queryRunner.query(`ALTER TABLE \`usuario\` CHANGE \`level\` \`level\` smallint NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuario\` CHANGE \`level\` \`level\` smallint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`plan\` ADD \`level\` smallint NOT NULL DEFAULT '10'`);
        await queryRunner.query(`ALTER TABLE \`historico_plan\` ADD \`level\` smallint NOT NULL DEFAULT '10'`);
    }

}
