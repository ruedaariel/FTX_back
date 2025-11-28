// src/config/data.source.ts
// import * as dotenv from 'dotenv';
// dotenv.config({ path: `./.${process.env.MODE_ENV || 'develop'}.env` });

// import { DataSource } from 'typeorm';
// import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

// export const AppDataSource = new DataSource({
//   type: 'mysql',
//   host: process.env.DB_HOST,
//   port: +(process.env.DB_PORT || '3306'),
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//   migrations: [__dirname + '/../../migraciones/*{.ts,.js}'],
//   synchronize: false,
//   migrationsRun: true,
//   logging: false,
//   namingStrategy: new SnakeNamingStrategy(),
// });

// src/config/data.source.ts

// NOTA: Se comenta la carga de dotenv en producción, ya que las variables de Railway ya están cargadas.
// if (process.env.NODE_ENV !== 'production') {
//     import * as dotenv from 'dotenv';
//     dotenv.config({ path: `./.${process.env.MODE_ENV || 'develop'}.env` });
// }
// Si mantienes el dotenv.config, asegúrate de que no sobrescriba las variables de Railway.

// import { DataSource } from 'typeorm';
// import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

// --- INICIO DEL DIAGNÓSTICO ---
// console.log('--- RAILWAY DB CONFIG CHECK ---');
// console.log('HOST:', process.env.MYSQLHOST);
// console.log('USER:', process.env.MYSQLUSER);
// console.log('PASS:', process.env.MYSQLPASSWORD ? '********' : 'NULL (Falta)'); // Muestra si la pass está, sin exponerla
// console.log('PORT:', process.env.MYSQLPORT);
// console.log('DB NAME:', process.env.MYSQL_DATABASE || process.env.MYSQLDATABASE);
// console.log('-------------------------------');
// --- FIN DEL DIAGNÓSTICO -------

// export const AppDataSource = new DataSource({
//   type: 'mysql',
  // Usa la variable de Railway si existe, si no usa la local DB_HOST, si no usa 'localhost'
  // host: process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
  // Nota: MYSQLPORT en Railway es un string, pero ya lo manejas con el operador '+'
//   port: +(process.env.MYSQLPORT || process.env.DB_PORT || '3306'),
//   username: process.env.MYSQLUSER || process.env.DB_USER,
//   password: process.env.MYSQLPASSWORD || process.env.DB_PASS,
//   database:
//     process.env.MYSQL_DATABASE ||
//     process.env.MYSQLDATABASE ||
//     process.env.DB_NAME,
//   entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//   migrations: [__dirname + '/../../migraciones/*{.ts,.js}'],
//   synchronize: false,
//   migrationsRun: true,
//   logging: false,
//   namingStrategy: new SnakeNamingStrategy(),
// });
// src/config/data.source.ts
// src/config/data.source.ts
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as dotenv from 'dotenv';

// Cargar variables de entorno si existen (aunque usaremos hardcodeados aquí)
dotenv.config();

// --- VALORES HARDCODEADOS PARA PRUEBA ---
// Estos valores han sido confirmados como funcionales desde Workbench.
const HARDCODED_CONFIG = {
  host: 'mysql.railway.internal', // Host público confirmado
  port: 47529,                        // Puerto público confirmado
  username: 'root',                   // Usuario confirmado
  password: 'lknoMyWmMNixEDecDmZBuwzrJHNUOzfI', // Contraseña confirmada
  database: 'railway',                // Asumiendo el nombre de la DB por defecto
};
// ----------------------------------------

export const AppDataSource = new DataSource({
  type: 'mysql',
  
  // *** USANDO VALORES HARDCODEADOS ***
  host: HARDCODED_CONFIG.host,
  port: HARDCODED_CONFIG.port,
  username: HARDCODED_CONFIG.username,
  password: HARDCODED_CONFIG.password,
  database: HARDCODED_CONFIG.database,
  
  // La ruta de las entidades, la dejamos como estaba:
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../../migraciones/*{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
});