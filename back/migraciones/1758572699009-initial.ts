import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1758572699009 implements MigrationInterface {
    name = 'Initial1758572699009'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Pagos\` DROP FOREIGN KEY \`FK_8d380528d3215498a4ef329c8c7\``);
        await queryRunner.query(`ALTER TABLE \`Pagos\` CHANGE \`usuario_id\` \`usuarioId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Pagos\` ADD CONSTRAINT \`FK_9d647875d9fb2f2abbb169a789d\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Pagos\` DROP FOREIGN KEY \`FK_9d647875d9fb2f2abbb169a789d\``);
        await queryRunner.query(`ALTER TABLE \`Pagos\` CHANGE \`usuarioId\` \`usuario_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Pagos\` ADD CONSTRAINT \`FK_8d380528d3215498a4ef329c8c7\` FOREIGN KEY (\`usuario_id\`) REFERENCES \`usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
