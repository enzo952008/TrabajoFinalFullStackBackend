import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  HttpCode, 
  HttpStatus, 
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';


@ApiTags('Usuarios')
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Crear un nuevo usuario
  @Post()
  @HttpCode(HttpStatus.CREATED) // Retorna código 201 al crear
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de solicitud inválidos' })
  @UseInterceptors(FileInterceptor('file'))
  async createUser(@UploadedFile() file: Express.Multer.File, @Body() createUserDto: CreateUserDto) {

    const filename = file?.filename ||  '' ;

    return this.userService.createUser(createUserDto);
  }

  // Obtener un usuario por ID
  @Get('/:id')
  @HttpCode(HttpStatus.OK) // Respuesta exitosa por defecto (200)
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario a obtener' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async findUserById(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }

  // Obtener todos los usuarios
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios obtenida exitosamente' })
  @ApiResponse({ status: 404, description: 'No se encontraron usuarios' })
  async findAllUsers() {
    return this.userService.findAllUsers();
  }

  // Actualizar un usuario por ID
  @Patch('/:id')
@HttpCode(HttpStatus.OK)
@ApiOperation({ summary: 'Actualizar un usuario por ID con archivo' })
@ApiParam({ name: 'id', description: 'ID del usuario a actualizar' })
@ApiBody({
  schema: {
    type: 'object',
    properties: {
      file: {
        type: 'string',
        format: 'binary', // Indica que se espera un archivo
      },
      updateUserDto: {
        type: 'object',
        $ref: '#/components/schemas/UpdateUserDto',
      },
    },
  },
})
@ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente' })
@ApiResponse({ status: 404, description: 'Usuario no encontrado' })
@UseInterceptors(FileInterceptor('file')) // Maneja el archivo subido
async updateUser(
  @Param('id') id: string,
  @UploadedFile() file: Express.Multer.File, // Archivo cargado (opcional)
  @Body() updateUserDto: UpdateUserDto // Datos a actualizar
) {
  // Verifica si hay un archivo y toma el nombre
  const filename = file?.filename || null;

  // Llama al servicio con el archivo (si existe) y los datos
  return this.userService.updateUser(id, updateUserDto, filename);
}


  // Eliminar un usuario por ID
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT) // Código 204 para eliminación exitosa
  @ApiOperation({ summary: 'Eliminar un usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario a eliminar' })
  @ApiResponse({ status: 204, description: 'Usuario eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async deleteUser(@Param('id') id: string) {
    await this.userService.deleteUser(id);
  }
}
