import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "Leanne Graham",
            "email": "Sincere@april.biz",
            "role": "INTERN",
        },
        {
            "id": 2,
            "name": "Ervin Howell",
            "email": "Shanna@melissa.tv",
            "role": "INTERN",
        },
        {
            "id": 3,
            "name": "Clementine Bauch",
            "email": "Nathan@yesenia.net",
            "role": "ENGINEER",
        },
        {
            "id": 4,
            "name": "Patricia Lebsack",
            "email": "Julianne.OConner@kory.org",
            "role": "ENGINEER",
        },
        {
            "id": 5,
            "name": "Chelsey Dietrich",
            "email": "Lucio_Hettinger@annie.ca",
            "role": "ADMIN",
        }
    ]

    // Método para obtener todos los usuarios o filtrar por rol si se proporciona
    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            // Filtrar usuarios por rol
            const roles = this.users.filter(user => user.role === role);

            // Chequear si hay usuarios con ese rol
            if (!roles.length) {
                throw new NotFoundException('User role not found');
            }

            return roles;
        }
        // Devolver todos los usuarios si no se especifica un rol
        return this.users;
    }

    // Método para obtener un usuario por su ID
    findOne(id: number) {
        // Buscar usuario por ID
        const user = this.users.find(user => user.id === id);

        // Chequeando si existe el usuario
        if (!user) {
            throw new NotFoundException('User not found.')
        }

        // Devolver el usuario encontrado
        return user;
    }

    // Método para crear un nuevo usuario
    create(user: CreateUserDTO) {
        // Ordenar usuarios por ID descendente
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
        const newUser = {
            id: usersByHighestId[0].id + 1, // Asignar el siguiente ID disponible
            ...user // Combinar los datos del nuevo usuario
        };
        // Agregar el nuevo usuario a la lista
        this.users.push(newUser);
        // Devolver la lista actualizada de usuarios
        return this.users;
    }

    // Método para actualizar un usuario por su ID
    update(id: number, updatedUser: UpdateUserDTO) {
        this.users = this.users.map(user => {
            // Actualizar los datos del usuario si se encuentra por ID
            if (user.id === id) {
                return { ...user, ...updatedUser };
            }
            // Mantener el usuario sin cambios si no coincide con el ID
            return user;
        });
        // Devolver el usuario actualizado
        return this.findOne(id);
    }

    // Método para eliminar un usuario por su ID
    delete(id: number) {
        // Buscar y almacenar el usuario a eliminar
        const removedUser = this.findOne(id);
        // Filtrar la lista para eliminar el usuario
        this.users = this.users.filter(user => user.id !== id);
        // Devolver el usuario eliminado
        return removedUser;
    }
}
