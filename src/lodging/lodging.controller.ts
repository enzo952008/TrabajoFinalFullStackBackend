import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { LodgingService } from './lodging.service';
import { CreateLodgingDto } from './dto/create-lodging.dto';
import { UpdateLodgingDto } from './dto/update-lodging.dto';
import { LodgingType } from './entities/lodging.entity';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Alojamientos')
@Controller('/alojamientos')
export class LodgingController {
  constructor(private readonly lodgingService: LodgingService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un nuevo alojamiento' })
  @ApiBody({ type: CreateLodgingDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Alojamiento creado exitosamente.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Datos inválidos.' })
  createLodging(@Body() createLodgingDto: CreateLodgingDto) {
    return this.lodgingService.createLodging(createLodgingDto);
  }

  @Get('/tipo/:type')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener alojamientos por tipo' })
  @ApiParam({ name: 'type', description: 'Tipo de alojamiento' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Alojamientos obtenidos exitosamente.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'No se encontraron alojamientos del tipo especificado.' })
  findLodgingByType(@Param('type') type: LodgingType) {
    return this.lodgingService.findLodgingsByType(type);
  }
  
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener alojamiento por ID' })
  @ApiParam({ name: 'id', description: 'ID del alojamiento' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Alojamiento obtenido exitosamente.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'No se encontró el alojamiento con el ID especificado.' })
  findLodgingById(@Param('id') id: string) {
    return this.lodgingService.findLodgingById(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener todos los alojamientos' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Alojamientos obtenidos exitosamente.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'No se encontraron alojamientos.' })
  findAllLodgings() {
    return this.lodgingService.findAllLodgings();
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Actualizar un alojamiento por ID' })
  @ApiParam({ name: 'id', description: 'ID del alojamiento a actualizar' })
  @ApiBody({ type: UpdateLodgingDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'Alojamiento actualizado exitosamente.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'No se encontró el alojamiento con el ID especificado.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Datos de actualización inválidos.' })
  update(@Param('id') id: string, @Body() updateLodgingDto: UpdateLodgingDto) {
    return this.lodgingService.updateLodging(id, updateLodgingDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un alojamiento por ID' })
  @ApiParam({ name: 'id', description: 'ID del alojamiento a eliminar' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Alojamiento eliminado exitosamente.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'No se encontró el alojamiento con el ID especificado.' })
  remove(@Param('id') id: string) {
    return this.lodgingService.deleteLodging(id);
  }
}
