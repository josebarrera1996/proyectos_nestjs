import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Request,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Role } from "src/common/enums/role.enum";
import { LoginDto } from "./dtos/login.dto";
import { RegisterDto } from "./dtos/register.dto";
import { Auth } from "./decorators/auth.decorator";

// Extendiendo 'Request' con las propiedades de esta interfaz
interface RequestWithUser extends Request {
  user: {
    email: string;
    role: string;
  };
}

@Controller("auth")
export class AuthController {
  // Inyección de dependencias para poder utilizar el siguiente servicio
  constructor(private readonly authService: AuthService) { }

  @Post("register")
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("login")
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @Auth(Role.USER)
  profile(@Request() req: RequestWithUser) {
    return req.user;
  }

  @Get('profile2')
  @Auth(Role.ADMIN)
  profile2(@Request() req: RequestWithUser) {
    return req.user;
  }
}
