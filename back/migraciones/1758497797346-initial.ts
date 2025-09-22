import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1758497797346 implements MigrationInterface {
    name = 'Initial1758497797346'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_0b37dbb7e61493287029e052e4\` ON \`historico_plan\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_0b37dbb7e61493287029e052e4\` ON \`historico_plan\` (\`nombre_plan\`)`);
    }

}
