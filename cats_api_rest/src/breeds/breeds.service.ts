import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBreedDto } from './dtos/create-breed.dto';
import { UpdateBreedDto } from './dtos/update-breed.dto';
import { Breed } from './entities/breed.entity';

@Injectable()
export class BreedsService {
    constructor(
        @InjectRepository(Breed) // Inyecta el repositorio de TypeORM para la entidad Breed
        private readonly breedsRepository: Repository<Breed>, // Define una propiedad privada para el repositorio de razas
    ) { }

    // Método para crear una nueva raza
    async create(createBreedDto: CreateBreedDto) {
        // Crea una nueva instancia de Breed a partir del DTO recibido
        const breed = this.breedsRepository.create(createBreedDto);
        return await this.breedsRepository.save(breed);
    }

    // Método para obtener todas las razas
    async findAll() {
        return await this.breedsRepository.find();
    }

    // Método para obtener una raza por su ID
    async findOne(id: number) {
        return await this.breedsRepository.findOneBy({ id });
    }

    // Método para actualizar la información de una raza
    async update(id: number, updateBreedDto: UpdateBreedDto) {
        // Actualiza una raza específica por su ID con los datos proporcionados (id y el DTO)
        return await this.breedsRepository.update(id, updateBreedDto);
    }

    // Método para eliminar un gato por su ID (eliminación suave)
    async remove(id: number) {
        // Marca un gato específico como eliminado en la base de datos (en la columna 'deletedAt')
        return await this.breedsRepository.softDelete(id);
    }
}