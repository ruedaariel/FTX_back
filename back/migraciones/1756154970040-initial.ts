import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1756154970040 implements MigrationInterface {
    name = 'Initial1756154970040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`datospersonales\` (\`id\` int NOT NULL, \`plan\` enum ('basico', 'pro', 'premium') NOT NULL DEFAULT 'basico', \`nombre\` varchar(100) NOT NULL, \`apellido\` varchar(100) NOT NULL, \`dni\` varchar(8) NOT NULL, \`phone\` varchar(10) NOT NULL, \`genero\` enum ('hombre', 'mujer', 'otro') NOT NULL, \`imagen_perfil\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ejercicio_basico\` (\`id_ejercicio_basico\` int NOT NULL AUTO_INCREMENT, \`nombre_ejercicio\` varchar(60) NOT NULL, \`observaciones\` varchar(255) NULL, \`imagen_link\` varchar(255) NULL, \`video_link\` varchar(255) NULL, UNIQUE INDEX \`IDX_69df2566fd028d03fe70c7c43a\` (\`nombre_ejercicio\`), PRIMARY KEY (\`id_ejercicio_basico\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ejercicio_rutina\` (\`ejercicio_rutina\` int NOT NULL AUTO_INCREMENT, \`repeticiones\` varchar(30) NOT NULL, \`dificultad\` varchar(30) NOT NULL, \`peso\` decimal(6,3) NOT NULL, \`observaciones\` varchar(255) NULL, \`dia_id_dia\` int NULL, \`ejercicio_basico_id_ejercicio_basico\` int NULL, PRIMARY KEY (\`ejercicio_rutina\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`dia\` (\`id_dia\` int NOT NULL AUTO_INCREMENT, \`nro_dia\` varchar(1) NOT NULL, \`focus\` varchar(255) NOT NULL, \`semana_id_semana\` int NULL, PRIMARY KEY (\`id_dia\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`semana\` (\`id_semana\` int NOT NULL AUTO_INCREMENT, \`nro_semana\` varchar(1) NOT NULL, \`estado_semana\` enum ('en proceso', 'terminada', 'no iniciada') NOT NULL, \`rutina_id_rutina\` int NULL, PRIMARY KEY (\`id_semana\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`rutina\` (\`id_rutina\` int NOT NULL AUTO_INCREMENT, \`nombre_rutina\` varchar(255) NOT NULL, \`estado_rutina\` enum ('activa', 'finalizada', 'proxima') NOT NULL, \`f_creacion\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`f_ultimo_acceso\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`f_baja\` timestamp NULL, \`id_usuario\` int NULL, UNIQUE INDEX \`IDX_798f7ffeb59bd5210d77155b4f\` (\`nombre_rutina\`), PRIMARY KEY (\`id_rutina\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`datos_fisicos\` (\`id\` int NOT NULL, \`actividad_diaria\` varchar(255) NOT NULL, \`peso\` decimal(6,3) NOT NULL, \`estatura\` int NOT NULL, \`metas\` varchar(255) NOT NULL, \`observaciones\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`usuario\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`rol\` enum ('usuario', 'admin') NOT NULL DEFAULT 'usuario', \`estado\` enum ('activo', 'inactivo', 'archivado') NOT NULL DEFAULT 'activo', \`f_baja\` timestamp NULL, \`f_creacion\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`f_ultimo_acceso\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`datos_personales_id\` int NULL, \`datos_fisicos_id\` int NULL, UNIQUE INDEX \`IDX_2863682842e688ca198eb25c12\` (\`email\`), UNIQUE INDEX \`REL_9ef85d51e2b9120cbcd50dd083\` (\`datos_personales_id\`), UNIQUE INDEX \`REL_599ab045d0bb25e6ad0eb8482a\` (\`datos_fisicos_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`ejercicio_rutina\` ADD CONSTRAINT \`FK_c9d9eb80d21b2dfeeebb18be1c5\` FOREIGN KEY (\`dia_id_dia\`) REFERENCES \`dia\`(\`id_dia\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ejercicio_rutina\` ADD CONSTRAINT \`FK_2ebabf91110068663bdf6b559e7\` FOREIGN KEY (\`ejercicio_basico_id_ejercicio_basico\`) REFERENCES \`ejercicio_basico\`(\`id_ejercicio_basico\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`dia\` ADD CONSTRAINT \`FK_e7fc87289f12535bfc7ded23d95\` FOREIGN KEY (\`semana_id_semana\`) REFERENCES \`semana\`(\`id_semana\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`semana\` ADD CONSTRAINT \`FK_0c017aa74410505ad6fb4176294\` FOREIGN KEY (\`rutina_id_rutina\`) REFERENCES \`rutina\`(\`id_rutina\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rutina\` ADD CONSTRAINT \`FK_f629865afcc50d26cf7fad6b892\` FOREIGN KEY (\`id_usuario\`) REFERENCES \`usuario\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD CONSTRAINT \`FK_9ef85d51e2b9120cbcd50dd083d\` FOREIGN KEY (\`datos_personales_id\`) REFERENCES \`datospersonales\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD CONSTRAINT \`FK_599ab045d0bb25e6ad0eb8482a5\` FOREIGN KEY (\`datos_fisicos_id\`) REFERENCES \`datos_fisicos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP FOREIGN KEY \`FK_599ab045d0bb25e6ad0eb8482a5\``);
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP FOREIGN KEY \`FK_9ef85d51e2b9120cbcd50dd083d\``);
        await queryRunner.query(`ALTER TABLE \`rutina\` DROP FOREIGN KEY \`FK_f629865afcc50d26cf7fad6b892\``);
        await queryRunner.query(`ALTER TABLE \`semana\` DROP FOREIGN KEY \`FK_0c017aa74410505ad6fb4176294\``);
        await queryRunner.query(`ALTER TABLE \`dia\` DROP FOREIGN KEY \`FK_e7fc87289f12535bfc7ded23d95\``);
        await queryRunner.query(`ALTER TABLE \`ejercicio_rutina\` DROP FOREIGN KEY \`FK_2ebabf91110068663bdf6b559e7\``);
        await queryRunner.query(`ALTER TABLE \`ejercicio_rutina\` DROP FOREIGN KEY \`FK_c9d9eb80d21b2dfeeebb18be1c5\``);
        await queryRunner.query(`DROP INDEX \`REL_599ab045d0bb25e6ad0eb8482a\` ON \`usuario\``);
        await queryRunner.query(`DROP INDEX \`REL_9ef85d51e2b9120cbcd50dd083\` ON \`usuario\``);
        await queryRunner.query(`DROP INDEX \`IDX_2863682842e688ca198eb25c12\` ON \`usuario\``);
        await queryRunner.query(`DROP TABLE \`usuario\``);
        await queryRunner.query(`DROP TABLE \`datos_fisicos\``);
        await queryRunner.query(`DROP INDEX \`IDX_798f7ffeb59bd5210d77155b4f\` ON \`rutina\``);
        await queryRunner.query(`DROP TABLE \`rutina\``);
        await queryRunner.query(`DROP TABLE \`semana\``);
        await queryRunner.query(`DROP TABLE \`dia\``);
        await queryRunner.query(`DROP TABLE \`ejercicio_rutina\``);
        await queryRunner.query(`DROP INDEX \`IDX_69df2566fd028d03fe70c7c43a\` ON \`ejercicio_basico\``);
        await queryRunner.query(`DROP TABLE \`ejercicio_basico\``);
        await queryRunner.query(`DROP TABLE \`datospersonales\``);
    }

}
