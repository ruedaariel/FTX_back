Paquetes que recuerdo haber instalado (por lo menos desde la parte de base de datos)

//sirve para entregar archivos estáticos (como HTML, CSS, JS, imágenes, etc.) desde tu servidor NestJS
npm i --save @nestjs/serve-static 
//trabajar con bases de datos usando TypeORM en NestJS, y específicamente MySQL como sistema gestor de base de datos
npm i --save @nestjs/typeorm typeorm mysql2

//es para usar SnakeNamingStrategy (usa esa notacion en la base de datos y cuando le paso los nombres a la bd, no hay problemas de formato de escritura de nombres)
//se "usa" en el database.module
npm install typeorm-naming-strategies

//para crear la migracion - ojo ANTES LEVANTAR LA bd - este comando es para CommonJS (no ESM)
npx ts-node --require tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate migraciones/initial --dataSource src/config/data.source.ts

//para la migracion incorporar en el package.json
"scripts": {
  "migration:generate": "ts-node --require tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate migraciones/initial --dataSource src/config/data.source.ts",
  "migration:run": "ts-node --require tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run --dataSource src/config/data.source.ts"
}
ejecutar: npm run migration:generate
npm run migration:run
 

//Se usan en DTO - da error al levantar el servidor
npm install @nestjs/mapped-types

//tener instalado este Paquete
npm install @nestjs/config
npm install @nestjs/typeorm typeorm @nestjs/config

//PARA LA BD, CREAR A MANO en mysql, la base de datos: CREATE DATABASE IF NOT EXISTS pruebaFTX

//Validaciones DTO
npm install class-validator class-transformer

//CREO Q HAY Q INSTALAR ALGO PARA CORS