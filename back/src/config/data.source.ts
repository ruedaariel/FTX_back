// src/config/data.source.ts
import * as dotenv from 'dotenv';
dotenv.config({ path: `./.${process.env.MODE_ENV || 'develope'}.env` });

import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../../migraciones/*{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
});


/*
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/
  /**.entity{.ts,.js}'],
  migrations: [__dirname + '/../../migraciones/*{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
});

/*
export const DataSourceConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT ?? '3306'), //si es undefined, toma el puerto 3306
  //port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/
  /**.entity{.ts,.js}'],
  migrations: [__dirname + '/../../migraciones/*{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
};

export const appDS = new DataSource(DataSourceConfig);
/*
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/
  /*.entity{.ts,.js}'],
  migrations: [__dirname + '/../../migraciones/*{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
});*/