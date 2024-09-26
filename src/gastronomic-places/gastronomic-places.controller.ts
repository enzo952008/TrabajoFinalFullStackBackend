import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GastronomicPlace } from './entities/gastronomic-place.entity';
import { CreateGastronomicPlaceDto } from './dto/create-gastronomic-place.dto';
import { UpdateGastronomicPlaceDto } from './dto/update-gastronomic-place.dto';
import { GastronomicPlaceService } from './gastronomic-places.service';

@Controller('/gastronomicplaces')
export class GastronomicPlacesController {
  constructor(private readonly gastronomicPlaceService: GastronomicPlaceService) {}

  @Post()
  createGastronomicPlace(@Body() createGastronomicPlaceDto: CreateGastronomicPlaceDto) {
    return this.gastronomicPlaceService.createGastronomicPlace(createGastronomicPlaceDto);
  }

  @Get()
  findAllGastronomicPlaces() {
    return this.gastronomicPlaceService.findAllGastronomicPlaces();
  }

  @Get(':id')
  findGastronomicPlaceById(@Param('id') id: string) {
    return this.gastronomicPlaceService.findGastronomicPlaceById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGastronomicPlaceDto: UpdateGastronomicPlaceDto,
  ): Promise<GastronomicPlace> {
    return await this.gastronomicPlaceService.updateGastronomicPlace(id, updateGastronomicPlaceDto);
  }

  @Delete(':id')
  deleteGastronomicPlace(@Param('id') id: string) {
    return this.gastronomicPlaceService.deleteGastronomicPlace(id);
  }
}

