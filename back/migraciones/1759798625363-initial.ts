import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1759798625363 implements MigrationInterface {
    name = 'Initial1759798625363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`rutina\` CHANGE \`estado_rutina\` \`estado_rutina\` enum ('activa', 'finalizada', 'proxima', 'en proceso') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Pagos\` ADD CONSTRAINT \`FK_9d647875d9fb2f2abbb169a789d\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Pagos\` DROP FOREIGN KEY \`FK_9d647875d9fb2f2abbb169a789d\``);
        await queryRunner.query(`ALTER TABLE \`rutina\` CHANGE \`estado_rutina\` \`estado_rutina\` enum ('activa', 'finalizada', 'proxima', 'en proceso', 'borrada') NOT NULL`);
    }

}
