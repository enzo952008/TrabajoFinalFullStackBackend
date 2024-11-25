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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { GastronomicPlace } from './entities/gastronomic-place.entity';
import { CreateGastronomicPlaceDto } from './dto/create-gastronomic-place.dto';
import { UpdateGastronomicPlaceDto } from './dto/update-gastronomic-place.dto';
import { GastronomicPlaceService } from './gastronomic-places.service';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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
  @ApiOperation({ summary: 'Actualizar un lugar gastronómico por ID y subir imagen' })
  @ApiParam({ name: 'id', description: 'ID del lugar gastronómico a actualizar' })
  @ApiBody({ type: UpdateGastronomicPlaceDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'Lugar gastronómico actualizado exitosamente.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'No se encontró el lugar gastronómico con el ID especificado.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Datos de actualización inválidos.' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `gastronomic-place-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const isMimeTypeAllowed = allowedTypes.test(file.mimetype);
        const isExtAllowed = allowedTypes.test(extname(file.originalname).toLowerCase());
        if (isMimeTypeAllowed && isExtAllowed) {
          callback(null, true);
        } else {
          callback(new Error('Only image files are allowed!'), false);
        }
      },
      limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
    }),
  )
  async updateGastronomicPlace(
    @Param('id') id: string,
    @Body() updateGastronomicPlaceDto: UpdateGastronomicPlaceDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<GastronomicPlace> {
    const filename = file ? `/uploads/${file.filename}` : null;
    return await this.gastronomicPlaceService.updateGastronomicPlace(id, updateGastronomicPlaceDto, filename);
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
