import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LodgingService } from './lodging.service';
import { CreateLodgingDto } from './dto/create-lodging.dto';
import { UpdateLodgingDto } from './dto/update-lodging.dto';
import { LodgingType } from './entities/lodging.entity';

@Controller('/alojamientos')
export class LodgingController {
  constructor(private readonly lodgingService: LodgingService) {}

  @Post()
  createLodging(@Body() createLodgingDto: CreateLodgingDto) {
    return this.lodgingService.createLodging(createLodgingDto);
  }

  @Get('/tipo/:type')
  findLodgingByType(@Param('type') type: LodgingType) {
    return this.lodgingService.findLodgingsByType(type);
  }
  
  @Get('/:id')
  findLodgingById(@Param('id') id: string) {
    return this.lodgingService.findLodgingById(id);
  }

  @Get()
  findAllLodgings() {
    return this.lodgingService.findAllLodgings();
  }
  

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateLodgingDto: UpdateLodgingDto) {
    return this.lodgingService.updateLodging(id, updateLodgingDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.lodgingService.deleteLodging(id);
  }
}
