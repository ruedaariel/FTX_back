import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1757431419194 implements MigrationInterface {
    name = 'Initial1757431419194'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`plan\` (\`id_plan\` int NOT NULL AUTO_INCREMENT, \`nombre_plan\` varchar(30) NOT NULL, \`descripcion\` varchar(255) NOT NULL, \`precio\` decimal(8,2) NOT NULL, \`f_cambio_precio\` date NOT NULL, PRIMARY KEY (\`id_plan\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`plan\``);
    }

}
