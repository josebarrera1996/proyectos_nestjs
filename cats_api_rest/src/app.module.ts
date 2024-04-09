import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { BreedsModule } from './breeds/breeds.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  // Importamos módulos que se utilizarán en este módulo
  imports: [
    // Configuramos el módulo ConfigModule para que sea global
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    // Configuramos TypeORM (utilizando los valores de las variables de entorno)
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CatsModule,
    BreedsModule,
    UsersModule,
    AuthModule,
  ],
  // Definimos los controladores que se utilizarán en este módulo
  controllers: [AppController],
  // Definimos los servicios que se utilizarán en este módulo
  providers: [AppService],
})

export class AppModule { }
