// src/moduloDatabase/database.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';


@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: `.${process.env.MODE_ENV || 'develope'}.env`,
    //   isGlobal: true,
    // }),
    ConfigModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],

      // useFactory: (config: ConfigService) => ({ 
         
      //   type: 'mysql',
      //   host: config.get<string>('DB_HOST'),
      //   port: config.get<number>('DB_PORT') || 3306,
      //   username: config.get<string>('DB_USER'),
      //   password: config.get<string>('DB_PASS'),
      //   database: config.get<string>('DB_NAME'),
      //   entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      //   migrations: [__dirname + '/../../migraciones/*{.ts,.js}'],
      //   synchronize: false,
      //   migrationsRun: false,
      //   logging:  false,
      //   namingStrategy: new SnakeNamingStrategy(),
      // }),
      useFactory: (config: ConfigService) => {
  console.log("***************************************");      
  console.log('Conectando a DB:', {
    host: config.get('DB_HOST'),
    port: config.get('DB_PORT'),
    user: config.get('DB_USER'),
    db: config.get('DB_NAME'),
  });
  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");   

  

  return {
    type: 'mysql',
    host: config.get('DB_HOST'),
    port: config.get('DB_PORT') || 3306,
    username: config.get('DB_USER'),
    password: config.get('DB_PASS'),
    database: config.get('DB_NAME'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../../migraciones/*{.ts,.js}'],
    synchronize: false,
    migrationsRun: false,
    namingStrategy: new SnakeNamingStrategy(),
  };
}

    }),
  ],

})
export class DatabaseModule {}


