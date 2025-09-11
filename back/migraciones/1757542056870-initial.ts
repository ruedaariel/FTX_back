import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1757542056870 implements MigrationInterface {
    name = 'Initial1757542056870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`datospersonales\` CHANGE \`plan\` \`plan_id_plan\` enum ('basico', 'pro', 'premium') NOT NULL DEFAULT 'basico'`);
        await queryRunner.query(`ALTER TABLE \`plan\` ADD UNIQUE INDEX \`IDX_4af6652e9452359006447a6a05\` (\`nombre_plan\`)`);
        await queryRunner.query(`ALTER TABLE \`datospersonales\` DROP COLUMN \`plan_id_plan\``);
        await queryRunner.query(`ALTER TABLE \`datospersonales\` ADD \`plan_id_plan\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`datospersonales\` ADD CONSTRAINT \`FK_e8c31ddc16c8e5dfefe47d460ca\` FOREIGN KEY (\`plan_id_plan\`) REFERENCES \`plan\`(\`id_plan\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`datospersonales\` DROP FOREIGN KEY \`FK_e8c31ddc16c8e5dfefe47d460ca\``);
        await queryRunner.query(`ALTER TABLE \`datospersonales\` DROP COLUMN \`plan_id_plan\``);
        await queryRunner.query(`ALTER TABLE \`datospersonales\` ADD \`plan_id_plan\` enum ('basico', 'pro', 'premium') NOT NULL DEFAULT 'basico'`);
        await queryRunner.query(`ALTER TABLE \`plan\` DROP INDEX \`IDX_4af6652e9452359006447a6a05\``);
        await queryRunner.query(`ALTER TABLE \`datospersonales\` CHANGE \`plan_id_plan\` \`plan\` enum ('basico', 'pro', 'premium') NOT NULL DEFAULT 'basico'`);
    }

}
