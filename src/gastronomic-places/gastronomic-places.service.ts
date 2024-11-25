import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGastronomicPlaceDto } from './dto/create-gastronomic-place.dto';
import { UpdateGastronomicPlaceDto } from './dto/update-gastronomic-place.dto';
import { Repository } from 'typeorm';
import { GastronomicPlace } from './entities/gastronomic-place.entity'; // Asegúrate de importar la entidad correcta

@Injectable()
export class GastronomicPlaceService {
  constructor(
    @Inject('GASTRONOMIC_PLACE_REPOSITORY')
    private readonly gastronomicPlaceRepository: Repository<GastronomicPlace>, // Corrige la entidad a "GastronomicPlace"
  ) {}

  async createGastronomicPlace(createGastronomicPlaceDto: CreateGastronomicPlaceDto): Promise<GastronomicPlace> {
    const gastronomicPlace = this.gastronomicPlaceRepository.create(createGastronomicPlaceDto);
    return await this.gastronomicPlaceRepository.save(gastronomicPlace);
  }


  async findAllGastronomicPlaces(): Promise<GastronomicPlace[]> {
    const places = await this.gastronomicPlaceRepository.find();
    if (!places.length) throw new NotFoundException('No se encontraron lugares gastronómicos');
    return places;
  }

  async findGastronomicPlaceById(id: string): Promise<GastronomicPlace> {
    const place = await this.gastronomicPlaceRepository.findOneBy({ id });
    if (!place) throw new NotFoundException(`No se encontró el lugar gastronómico con id ${id}`);
    return place;
  }

  async updateGastronomicPlace(
    id: string,
    updateGastronomicPlaceDto: UpdateGastronomicPlaceDto,
    imageUrl: string | null,
  ): Promise<GastronomicPlace> {
    const place = await this.gastronomicPlaceRepository.preload({
      id,
      ...updateGastronomicPlaceDto,
      ...(imageUrl && { image_url: imageUrl }), // Solo actualiza `image_url` si hay una nueva imagen
    });
  
    if (!place) {
      throw new NotFoundException(`No se encontró el lugar gastronómico con id ${id}`);
    }
  
    return await this.gastronomicPlaceRepository.save(place);
  }

  async deleteGastronomicPlace(id: string) {
    const place = await this.gastronomicPlaceRepository.findOneBy({ id });
    if (!place) throw new NotFoundException(`No se encontró el lugar gastronómico con id ${id}`);
    return this.gastronomicPlaceRepository.delete(place);
  }
}
