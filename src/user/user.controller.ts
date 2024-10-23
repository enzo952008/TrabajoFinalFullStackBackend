import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  HttpCode, 
  HttpStatus 
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Crear un nuevo usuario
  @Post()
  @HttpCode(HttpStatus.CREATED) // Retorna código 201 al crear
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  // Obtener un usuario por ID
  @Get('/:id')
  @HttpCode(HttpStatus.OK) // Respuesta exitosa por defecto (200)
  async findUserById(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }

  // Obtener todos los usuarios
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllUsers() {
    return this.userService.findAllUsers();
  }

  // Actualizar un usuario por ID
  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  // Eliminar un usuario por ID
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT) // Código 204 para eliminación exitosa
  async deleteUser(@Param('id') id: string) {
    await this.userService.deleteUser(id);
  }
}
