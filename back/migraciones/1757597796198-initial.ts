import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1757597796198 implements MigrationInterface {
    name = 'Initial1757597796198'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`plan\` CHANGE \`f_cambio_precio\` \`f_cambio\` date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`plan\` CHANGE \`f_cambio\` \`f_cambio_precio\` date NOT NULL`);
    }

}
