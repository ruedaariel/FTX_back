import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1758330299944 implements MigrationInterface {
    name = 'Initial1758330299944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Pagos\` (\`id_pagos\` int NOT NULL AUTO_INCREMENT, \`fecha_pago\` timestamp NOT NULL, \`estado\` varchar(32) NOT NULL, \`dias_adicionales\` int NOT NULL DEFAULT '0', \`metodo_de_pago\` enum ('tarjeta', 'mercadopago', 'transferencia', 'efectivo') NOT NULL, \`monto\` decimal(10,2) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`usuario_id\` int NOT NULL, PRIMARY KEY (\`id_pagos\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Pagos\` ADD CONSTRAINT \`FK_8d380528d3215498a4ef329c8c7\` FOREIGN KEY (\`usuario_id\`) REFERENCES \`usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Pagos\` DROP FOREIGN KEY \`FK_8d380528d3215498a4ef329c8c7\``);
        await queryRunner.query(`DROP TABLE \`Pagos\``);
    }

}
