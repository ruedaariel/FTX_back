import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1757721018732 implements MigrationInterface {
    name = 'Initial1757721018732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`datospersonales\` (\`id\` int NOT NULL, \`nombre\` varchar(100) NOT NULL, \`apellido\` varchar(100) NOT NULL, \`dni\` varchar(8) NOT NULL, \`phone\` varchar(10) NOT NULL, \`genero\` enum ('hombre', 'mujer', 'otro') NOT NULL, \`f_nacimiento\` date NOT NULL, \`imagen_perfil\` varchar(255) NULL, \`estado\` enum ('activo', 'inactivo', 'archivado') NOT NULL DEFAULT 'activo', \`plan_id_plan\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`plan\` DROP COLUMN \`f_cambio\``);
        await queryRunner.query(`ALTER TABLE \`plan\` ADD \`f_cambio\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`historico_plan\` ADD CONSTRAINT \`FK_ffb49f865fec2ed469cf547686a\` FOREIGN KEY (\`plan_id_plan\`) REFERENCES \`plan\`(\`id_plan\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`datospersonales\` ADD CONSTRAINT \`FK_e8c31ddc16c8e5dfefe47d460ca\` FOREIGN KEY (\`plan_id_plan\`) REFERENCES \`plan\`(\`id_plan\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`datospersonales\` DROP FOREIGN KEY \`FK_e8c31ddc16c8e5dfefe47d460ca\``);
        await queryRunner.query(`ALTER TABLE \`historico_plan\` DROP FOREIGN KEY \`FK_ffb49f865fec2ed469cf547686a\``);
        await queryRunner.query(`ALTER TABLE \`plan\` DROP COLUMN \`f_cambio\``);
        await queryRunner.query(`ALTER TABLE \`plan\` ADD \`f_cambio\` date NOT NULL`);
        await queryRunner.query(`DROP TABLE \`datospersonales\``);
    }

}
