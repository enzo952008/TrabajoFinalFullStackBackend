import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { RolService } from "./rol.service";
import { Get } from "@nestjs/common";
import { CreateRolDto } from "./dto/create.rol.dto";
import { UpdateRolDto } from "./dto/update.rol.dto";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Roles')
@Controller('/roles')
export class RolController {
    constructor(private readonly rolService: RolService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Obtener todos los roles' })
    @ApiResponse({ status: 200, description: 'Roles obtenidos exitosamente' })
    @ApiResponse({ status: 404, description: 'No se encontraron roles en la base de datos' })
    getAll() {
        return this.rolService.findAll();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Crear un nuevo rol' })
    @ApiResponse({ status: 201, description: 'Rol creado exitosamente' })
    @ApiResponse({ status: 400, description: 'Datos de solicitud inválidos' })
    @ApiBody({ type: CreateRolDto })
    createRol(@Body() createRolDto: CreateRolDto) {
        return this.rolService.createRol(createRolDto)
    }

    @Patch('/:id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Actualizar un rol existente' })
    @ApiParam({ name: 'id', description: 'ID del rol a actualizar' })
    @ApiResponse({ status: 200, description: 'Rol actualizado exitosamente' })
    @ApiResponse({ status: 404, description: 'Rol no encontrado' })
    updateRol(
        @Param('id') id: string,
        @Body() updateRolDto: UpdateRolDto
    ) {
        return this.rolService.updateRol(id, updateRolDto)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Eliminar un rol por ID' })
    @ApiParam({ name: 'id', description: 'ID del rol a eliminar' })
    @ApiResponse({ status: 204, description: 'Rol eliminado exitosamente' })
    @ApiResponse({ status: 404, description: 'Rol no encontrado' })
    deleteRol(
        @Param('id') id: string,
    ) {
        return this.rolService.deleteRol(id)
    }

}