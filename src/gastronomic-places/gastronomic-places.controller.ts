import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { GastronomicPlace } from './entities/gastronomic-place.entity';
import { CreateGastronomicPlaceDto } from './dto/create-gastronomic-place.dto';
import { UpdateGastronomicPlaceDto } from './dto/update-gastronomic-place.dto';
import { GastronomicPlaceService } from './gastronomic-places.service';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Lugares gastronómicos')
@Controller('/gastronomicplaces')
export class GastronomicPlacesController {
  constructor(private readonly gastronomicPlaceService: GastronomicPlaceService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un nuevo lugar gastronómico' })
  @ApiBody({ type: CreateGastronomicPlaceDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Lugar gastronómico creado exitosamente.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Datos inválidos.' })
  createGastronomicPlace(@Body() createGastronomicPlaceDto: CreateGastronomicPlaceDto) {
    return this.gastronomicPlaceService.createGastronomicPlace(createGastronomicPlaceDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener todos los lugares gastronómicos' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Lugares gastronómicos obtenidos exitosamente.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'No se encontraron lugares gastronómicos.' })
  findAllGastronomicPlaces() {
    return this.gastronomicPlaceService.findAllGastronomicPlaces();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener lugar gastronómico por ID' })
  @ApiParam({ name: 'id', description: 'ID del lugar gastronómico' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Lugar gastronómico obtenido exitosamente.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'No se encontró el lugar gastronómico con el ID especificado.' })
  findGastronomicPlaceById(@Param('id') id: string) {
    return this.gastronomicPlaceService.findGastronomicPlaceById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Actualizar un lugar gastronómico por ID' })
  @ApiParam({ name: 'id', description: 'ID del lugar gastronómico a actualizar' })
  @ApiBody({ type: UpdateGastronomicPlaceDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'Lugar gastronómico actualizado exitosamente.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'No se encontró el lugar gastronómico con el ID especificado.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Datos de actualización inválidos.' })
  async updateGastronomicPlace(
    @Param('id') id: string,
    @Body() updateGastronomicPlaceDto: UpdateGastronomicPlaceDto,
  ): Promise<GastronomicPlace> {
    return await this.gastronomicPlaceService.updateGastronomicPlace(id, updateGastronomicPlaceDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un lugar gastronómico por ID' })
  @ApiParam({ name: 'id', description: 'ID del lugar gastronómico a eliminar' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Lugar gastronómico eliminado exitosamente.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'No se encontró el lugar gastronómico con el ID especificado.' })
  deleteGastronomicPlace(@Param('id') id: string) {
    return this.gastronomicPlaceService.deleteGastronomicPlace(id);
  }
}
