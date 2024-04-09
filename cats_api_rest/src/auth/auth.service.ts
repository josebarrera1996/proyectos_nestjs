import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
    Logger,
} from "@nestjs/common";

import { JwtService } from "@nestjs/jwt";
import * as bcryptjs from "bcryptjs";
import { UsersService } from "src/users/users.service";
import { RegisterDto } from "./dtos/register.dto";
import { LoginDto } from "./dtos/login.dto";

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    // Inyección de dependencias para utilizar los siguiente servicios
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    // Método para registrar un nuevo usuario
    async register({ password, email, name }: RegisterDto) {
        // Busca si ya existe un usuario con el mismo email
        const user = await this.usersService.findOneByEmail(email);

        // Si el usuario ya existe, lanza una excepción de BadRequest
        if (user) {
            throw new BadRequestException("Email already exists");
        }

        // Hashea la contraseña antes de guardarla en la base de datos
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Crea un nuevo usuario en la base de datos
        await this.usersService.create({
            name,
            email,
            password: hashedPassword,
        });

        // Devuelve un mensaje de éxito
        return {
            message: "User created successfully",
        };
    }

    // Método para realizar el inicio de sesión de un usuario
    async login({ email, password }: LoginDto) {
        // Busca el usuario por su email
        const user = await this.usersService.findOneByEmailWithPassword(email);

        // Si no se encuentra ningún usuario con el email proporcionado, lanza una excepción de Unauthorized
        if (!user) {
            throw new UnauthorizedException("Invalid email");
        }

        // Comprueba si la contraseña proporcionada coincide con la contraseña almacenada
        const isPasswordValid = await bcryptjs.compare(password, user.password);

        // Si la contraseña no es válida, lanza una excepción de Unauthorized
        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid password");
        }

        // Si el usuario y la contraseña son válidos, se crea un token de autenticación
        const payload = { email: user.email, role: user.role };

        const token = await this.jwtService.signAsync(payload);

        // Devuelve el token de autenticación junto con el email del usuario
        return {
            token: token,
            email: user.email,
        };
    }
}
