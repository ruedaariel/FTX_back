import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1756219430839 implements MigrationInterface {
    name = 'Initial1756219430839'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`datos_fisicos\` DROP COLUMN \`actividad_diaria\``);
        await queryRunner.query(`ALTER TABLE \`datos_fisicos\` ADD \`actividad_diaria\` varchar(30) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`datos_fisicos\` DROP COLUMN \`metas\``);
        await queryRunner.query(`ALTER TABLE \`datos_fisicos\` ADD \`metas\` varchar(100) NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_798f7ffeb59bd5210d77155b4f\` ON \`rutina\``);
        await queryRunner.query(`ALTER TABLE \`rutina\` DROP COLUMN \`nombre_rutina\``);
        await queryRunner.query(`ALTER TABLE \`rutina\` ADD \`nombre_rutina\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`rutina\` ADD UNIQUE INDEX \`IDX_798f7ffeb59bd5210d77155b4f\` (\`nombre_rutina\`)`);
        await queryRunner.query(`ALTER TABLE \`rutina\` CHANGE \`estado_rutina\` \`estado_rutina\` enum ('activa', 'finalizada', 'proxima', 'en proceso', 'borrada') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD \`password\` varchar(128) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`rutina\` CHANGE \`estado_rutina\` \`estado_rutina\` enum ('activa', 'finalizada', 'proxima') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`rutina\` DROP INDEX \`IDX_798f7ffeb59bd5210d77155b4f\``);
        await queryRunner.query(`ALTER TABLE \`rutina\` DROP COLUMN \`nombre_rutina\``);
        await queryRunner.query(`ALTER TABLE \`rutina\` ADD \`nombre_rutina\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_798f7ffeb59bd5210d77155b4f\` ON \`rutina\` (\`nombre_rutina\`)`);
        await queryRunner.query(`ALTER TABLE \`datos_fisicos\` DROP COLUMN \`metas\``);
        await queryRunner.query(`ALTER TABLE \`datos_fisicos\` ADD \`metas\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`datos_fisicos\` DROP COLUMN \`actividad_diaria\``);
        await queryRunner.query(`ALTER TABLE \`datos_fisicos\` ADD \`actividad_diaria\` varchar(255) NOT NULL`);
    }

}
