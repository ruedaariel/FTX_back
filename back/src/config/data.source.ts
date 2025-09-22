// src/config/data.source.ts
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot({
  envFilePath: '.develop.env',
});

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'ftx_pagos_test',
  synchronize: false, // Para usar migraciones
  logging: true,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migraciones/*.ts'],
  subscribers: ['src/**/*.subscriber.ts'],
});

