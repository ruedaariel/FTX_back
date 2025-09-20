import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1758324700450 implements MigrationInterface {
    name = 'Initial1758324700450'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`datospersonales\` CHANGE \`f_nacimiento\` \`f_nacimiento\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`datospersonales\` CHANGE \`imagen_perfil\` \`imagen_perfil\` varchar(255) NOT NULL DEFAULT 'usuario.png'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`datospersonales\` CHANGE \`imagen_perfil\` \`imagen_perfil\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`datospersonales\` CHANGE \`f_nacimiento\` \`f_nacimiento\` date NOT NULL`);
    }

}
