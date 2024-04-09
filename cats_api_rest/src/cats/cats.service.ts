import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatDto } from './dtos/create-cat.dto';
import { UpdateCatDto } from './dtos/update-cat.dto';
import { Cat } from './entities/cat.entity';
import { Breed } from 'src/breeds/entities/breed.entity';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class CatsService {
    constructor(
        // Inyección de dependencias para trabajar con los respectivos repositorios
        @InjectRepository(Cat)
        private catsRepository: Repository<Cat>,

        @InjectRepository(Breed)
        private breedsRepository: Repository<Breed>,
    ) { }

    // Método para crear un nuevo gato
    async create(createCatDto: CreateCatDto, user: ActiveUserInterface) {
        // Validar la raza del gato
        const breed = await this.validateBreed(createCatDto.breed);
        // Guardar el gato en la base de datos
        return await this.catsRepository.save({
            ...createCatDto,
            breed: breed,
            userEmail: user.email,
        });
    }

    // Método para obtener todos los gatos
    async findAll(user: ActiveUserInterface) {
        // Si el usuario es administrador, devolver todos los gatos
        if (user.role === Role.ADMIN) {
            return await this.catsRepository.find();
        }
        // De lo contrario, devolver solo los gatos propiedad del usuario
        return await this.catsRepository.find({
            where: { userEmail: user.email },
        });
    }

    // Método para obtener un gato por su ID
    async findOne(id: number, user: ActiveUserInterface) {
        // Buscar el gato por su ID
        const cat = await this.catsRepository.findOneBy({ id });
        // Si el gato no existe, lanzar una excepción
        if (!cat) {
            throw new BadRequestException('Cat not found');
        }
        // Validar si el usuario tiene propiedad sobre el gato
        this.validateOwnership(cat, user);
        return cat;
    }

    // Método para actualizar la información de un gato
    async update(id: number, updateCatDto: UpdateCatDto, user: ActiveUserInterface) {
        // Verificar si el gato existe y pertenece al usuario
        await this.findOne(id, user);
        // Actualizar el gato en la base de datos
        return await this.catsRepository.update(id, {
            ...updateCatDto,
            // Validar y actualizar la raza del gato si se proporciona en la solicitud
            breed: updateCatDto.breed ? await this.validateBreed(updateCatDto.breed) : undefined,
            userEmail: user.email,
        })
    }

    // Método para eliminar un gato por su ID (eliminación suave)
    async remove(id: number, user: ActiveUserInterface) {
        // Verificar si el gato existe y pertenece al usuario
        await this.findOne(id, user);
        // Eliminar el gato de forma suave
        return await this.catsRepository.softDelete({ id }); // se le pasa el id
    }

    // Validar si el usuario tiene propiedad sobre el gato
    private validateOwnership(cat: Cat, user: ActiveUserInterface) {
        if (user.role !== Role.ADMIN && cat.userEmail !== user.email) {
            throw new UnauthorizedException();
        }
    }

    // Validar si la raza del gato existe en la base de datos
    private async validateBreed(breed: string) {
        const breedEntity = await this.breedsRepository.findOneBy({ name: breed });

        if (!breedEntity) {
            throw new BadRequestException('Breed not found');
        }

        return breedEntity;
    }
}
