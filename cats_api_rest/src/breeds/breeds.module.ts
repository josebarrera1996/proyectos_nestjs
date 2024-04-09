import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BreedsService } from './breeds.service';
import { BreedsController } from './breeds.controller';
import { Breed } from "./entities/breed.entity";

@Module({
  // Importa el módulo TypeOrmModule y especifica la entidad Breed para trabajar con ella
  imports: [TypeOrmModule.forFeature([Breed])],
  // Declara los controladores que pertenecen a este módulo
  controllers: [BreedsController],
  // Declara los servicios que pertenecen a este módulo
  providers: [BreedsService],
  // Exporta el módulo TypeOrmModule para que otros módulos puedan usarlo
  exports: [TypeOrmModule],
})
export class BreedsModule { }
