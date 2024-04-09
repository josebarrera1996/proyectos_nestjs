import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { CreateBreedDto } from './dtos/create-breed.dto';
import { UpdateBreedDto } from './dtos/update-breed.dto';

@Controller('breeds') // Controlador para las rutas relacionadas con las razas
export class BreedsController {
  // Inyección de dependencias para acceder a los métodos del servicio
  constructor(private readonly breedsService: BreedsService) { }

  @Post() // Maneja las solicitudes POST a la ruta /breeds
  create(@Body() createBreedDto: CreateBreedDto) {
    return this.breedsService.create(createBreedDto); // Llama al método create del servicio para crear una nueva raza
  }

  @Get() // Maneja las solicitudes GET a la ruta /breeds
  findAll() {
    return this.breedsService.findAll(); // Llama al método findAll del servicio para obtener todas las razas
  }

  @Get(':id') // Maneja las solicitudes GET a la ruta /breeds/:id
  findOne(@Param('id') id: number) {
    return this.breedsService.findOne(id); // Llama al método findOne del servicio para obtener una raza por su ID
  }

  @Patch(':id') // Maneja las solicitudes PATCH a la ruta /breeds/:id
  update(@Param('id') id: number, @Body() updateBreedDto: UpdateBreedDto) {
    return this.breedsService.update(id, updateBreedDto); // Llama al método update del servicio para actualizar una raza por su ID
  }

  @Delete(':id') // Maneja las solicitudes DELETE a la ruta /breeds/:id
  remove(@Param('id') id: number) {
    return this.breedsService.remove(id); // Llama al método remove del servicio para eliminar una raza por su ID
  }
}
