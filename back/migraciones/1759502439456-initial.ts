import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1759502439456 implements MigrationInterface {
    name = 'Initial1759502439456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const FK_REAL_NAME = 'FK_9d647875d9fb2f2abbb169a789d'; // 👈 ¡REEMPLAZA ESTO!

        // PASO 1: ELIMINAR LA RESTRICCIÓN DE CLAVE FORÁNEA (con el nombre real)
        await queryRunner.query(`ALTER TABLE \`Pagos\` DROP FOREIGN KEY \`${FK_REAL_NAME}\``);

        // PASO 2: AHORA ELIMINAR EL ÍNDICE (este nombre es el que falló originalmente)
        await queryRunner.query(`DROP INDEX \`FK_8d380528d3215498a4ef329c8c7\` ON \`Pagos\``);

        // AÑADE AQUÍ el resto de las operaciones (DROP COLUMN, ADD NEW COLUMN, etc.)
        // que tu migración originalmente intentaba hacer.
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Para revertir, se crea el índice. Si se hicieron cambios de columna en 'up',
        // el down debe revertirlos, y luego recrear la FK.
        // Aquí solo se revierte el índice, asumiendo que el cuerpo de la migración era más complejo.
        await queryRunner.query(`CREATE INDEX \`FK_8d380528d3215498a4ef329c8c7\` ON \`Pagos\` (\`usuarioId\`)`);
    }
}
