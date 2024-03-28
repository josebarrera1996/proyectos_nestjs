import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

// Definiendo las propiedades que se esperan ingresar para crear un 'User'
export class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsEnum(["INTERN", "ENGINEER", 'ADMIN'], {
        message: 'Valid role required'
    })
    role: "INTERN" | "ENGINEER" | 'ADMIN';
}