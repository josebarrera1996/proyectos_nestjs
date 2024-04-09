import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';
import { CatsService } from './cats.service';
import { UpdateCatDto } from './dtos/update-cat.dto';
import { CreateCatDto } from './dtos/create-cat.dto';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';

@Auth(Role.USER)
@Controller('cats') // Controlador para las rutas relacionadas con los gatos
export class CatsController {
  constructor(private readonly catsService: CatsService) { } // Inyección de dependencia del servicio CatsService

  @Post() // Maneja las solicitudes POST a la ruta /cats
  create(
    @Body() createCatDto: CreateCatDto, // Datos del nuevo gato a crear
    @ActiveUser() user: ActiveUserInterface, // Usuario activo que realiza la solicitud
  ) {
    // Llama al método create del servicio para crear un nuevo gato
    return this.catsService.create(createCatDto, user);
  }

  @Get() // Maneja las solicitudes GET a la ruta /cats
  findAll(@ActiveUser() user: ActiveUserInterface) {
    console.log(user); // Imprime información del usuario activo en la consola
    return this.catsService.findAll(user); // Llama al método findAll del servicio para obtener todos los gatos
  }

  @Get(':id') // Maneja las solicitudes GET a la ruta /cats/:id
  findOne(@Param('id') id: number, @ActiveUser() user: ActiveUserInterface) {
    return this.catsService.findOne(id, user); // Llama al método findOne del servicio para obtener un gato por su ID
  }

  @Patch(':id') // Maneja las solicitudes PATCH a la ruta /cats/:id
  update(@Param('id') id: number, @Body() updateCatDto: UpdateCatDto, @ActiveUser() user: ActiveUserInterface) {
    return this.catsService.update(id, updateCatDto, user); // Llama al método update del servicio para actualizar un gato por su ID
  }

  @Delete(':id') // Maneja las solicitudes DELETE a la ruta /cats/:id
  remove(@Param('id') id: number, @ActiveUser() user: ActiveUserInterface) {
    return this.catsService.remove(id, user); // Llama al método remove del servicio para eliminar un gato por su ID
  }
}
