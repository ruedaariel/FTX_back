import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1757431368327 implements MigrationInterface {
    name = 'Initial1757431368327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`plan_entity\` CHANGE \`id_plan\` \`plan\` int NOT NULL AUTO_INCREMENT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`plan_entity\` CHANGE \`plan\` \`id_plan\` int NOT NULL AUTO_INCREMENT`);
    }

}
