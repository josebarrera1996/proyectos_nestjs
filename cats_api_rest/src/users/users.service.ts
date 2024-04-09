import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
    constructor(
        // Inyección de dependencias para utilizar el siguiente repositorio
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ) { }

    // Método para crear un nuevo usuario
    async create(createUserDto: CreateUserDto) {
        // Crea una nueva instancia de Breed a partir del DTO recibido
        const user = this.usersRepository.create(createUserDto);
        return await this.usersRepository.save(user);
    }

    // Método para encontrar a todos los usuarios
    async findAll() {
        return await this.usersRepository.find();
    }

    // Método para encontrar a un usuario (por su email)
    async findOneByEmail(email: string) {
        return await this.usersRepository.findOneBy({ email });
    }

    // Método para encontrar a un usuario (por su email)
    async findOneByEmailWithPassword(email: string) {
        return this.usersRepository.findOne({
            where: { email },
            select: ['id', 'name', 'email', 'password', 'role'],
        });
    }

    // Método para actualizar un usuario (por su id)
    async update(id: number, updateUserDto: UpdateUserDto) {
        // Guarda los cambios para el usuario siguiendo el siguiente DTO
        return await this.usersRepository.update(id, updateUserDto);
    }

    // Método para eliminar un usuario (por su id) de forma 'soft'
    async remove(id: number) {
        return await this.usersRepository.softDelete(id);
    }
}
