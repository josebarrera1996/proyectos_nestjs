import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDTO } from "./create-user.dto";

// Definiendo las propiedades que se esperan para actualizar a un 'User'
// Con 'PartyalType' reutilizaremos las propiedades de CreateUserDTO, las cuales no serán requeridas en su totalidad
export class UpdateUserDTO extends PartialType(CreateUserDTO) {}

