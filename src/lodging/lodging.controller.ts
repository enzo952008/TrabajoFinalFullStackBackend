import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UploadedFile, BadRequestException, UseInterceptors } from '@nestjs/common';
import { LodgingService } from './lodging.service';
import { CreateLodgingDto } from './dto/create-lodging.dto';
import { UpdateLodgingDto } from './dto/update-lodging.dto';
import { LodgingType } from './entities/lodging.entity';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBody } from '@nestjs/swagger';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Alojamientos')
@Controller('/alojamientos')
export class LodgingController {
  constructor(private readonly lodgingService: LodgingService) {}

  @Post()
@HttpCode(HttpStatus.CREATED)
@ApiOperation({ summary: 'Crear un nuevo alojamiento' })
@ApiResponse({ status: HttpStatus.CREATED, description: 'Alojamiento creado exitosamente.' })
@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Datos inválidos o error al subir la imagen.' })
@UseInterceptors(
  FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/lodgings', // Carpeta específica para alojamientos
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `lodging-${uniqueSuffix}${ext}`);
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
async createLodging(
  @Body() createLodgingDto: CreateLodgingDto,
  @UploadedFile() file: Express.Multer.File,
) {
  if (!file) {
    throw new BadRequestException('La imagen es requerida.');
  }

  // Pasamos el archivo y el DTO al servicio
  return this.lodgingService.createLodging(createLodgingDto, file);
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
