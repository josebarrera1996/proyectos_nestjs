import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BreedsModule } from "src/breeds/breeds.module";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.service";
import { BreedsService } from "src/breeds/breeds.service";
import { Cat } from "./entities/cat.entity";

@Module({
  // Importa el módulo TypeOrmModule para trabajar con el ORM TypeORM y el módulo de la relación
  imports: [TypeOrmModule.forFeature([Cat]), BreedsModule],
  // Declara los controladores que pertenecen a este módulo
  controllers: [CatsController],
  // Declara los servicios que pertenecen a este módulo
  providers: [CatsService, BreedsService],
  exports: [],
})
export class CatsModule { }
