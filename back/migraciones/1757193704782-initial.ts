import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1757193704782 implements MigrationInterface {
    name = 'Initial1757193704782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ejercicio_rutina\` CHANGE \`ejercicio_rutina\` \`id_ejercicio_rutina\` int NOT NULL AUTO_INCREMENT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ejercicio_rutina\` CHANGE \`id_ejercicio_rutina\` \`ejercicio_rutina\` int NOT NULL AUTO_INCREMENT`);
    }

}
