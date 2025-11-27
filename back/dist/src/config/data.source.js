"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
console.log('--- RAILWAY DB CONFIG CHECK ---');
console.log('HOST:', process.env.MYSQLHOST);
console.log('USER:', process.env.MYSQLUSER);
console.log('PASS:', process.env.MYSQLPASSWORD ? '********' : 'NULL (Falta)');
console.log('PORT:', process.env.MYSQLPORT);
console.log('DB NAME:', process.env.MYSQL_DATABASE || process.env.MYSQLDATABASE);
console.log('-------------------------------');
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
    port: +(process.env.MYSQLPORT || process.env.DB_PORT || '3306'),
    username: process.env.MYSQLUSER || process.env.DB_USER,
    password: process.env.MYSQLPASSWORD || process.env.DB_PASS,
    database: process.env.MYSQL_DATABASE ||
        process.env.MYSQLDATABASE ||
        process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../../migraciones/*{.ts,.js}'],
    synchronize: false,
    migrationsRun: true,
    logging: false,
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
});
//# sourceMappingURL=data.source.js.map