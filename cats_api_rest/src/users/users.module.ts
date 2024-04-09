import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity'; 
import { UsersService } from './users.service';
import { UsersController } from './users.controller'; 

@Module({
   // Importa la entidad User para que pueda ser utilizada por TypeORM
  imports: [TypeOrmModule.forFeature([User])],
   // Declara los controladores que pertenecen a este módulo
  controllers: [UsersController],
  // Declara los servicios que pertenecen a este módulo
  providers: [UsersService], 
  // Exporta el servicio UsersService para que otros módulos puedan utilizarlo
  exports: [UsersService], 
})
export class UsersModule { } 
