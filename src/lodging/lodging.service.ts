import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLodgingDto } from './dto/create-lodging.dto';
import { UpdateLodgingDto } from './dto/update-lodging.dto';
import { Repository } from 'typeorm';
import { Lodging } from './entities/lodging.entity';
import { LodgingType } from './entities/lodging.entity';

@Injectable()
export class LodgingService {
  constructor(
    @Inject ('LODGING_REPOSITORY')
    private readonly lodgingRepository: Repository<Lodging>,
  ) {}

  async createLodging(createLodgingDto: CreateLodgingDto, file: Express.Multer.File): Promise<Lodging> {
    // Crear la URL de la imagen cargada
    const image_lodging_url = `/uploads/lodgings/${file.filename}`; // Cambiamos el nombre de la variable
  
    // Crear el objeto del alojamiento con la URL de la imagen
    const lodging = this.lodgingRepository.create({
      ...createLodgingDto,
      image_lodging_url, // Usamos el campo correcto
    });
  
    // Guardar el alojamiento en la base de datos
    return this.lodgingRepository.save(lodging);
  }

  async findAllLodgings(): Promise <Lodging[]> {
    const lodgings = await this.lodgingRepository.find()
    if (!lodgings.length) throw new NotFoundException ('No se encontraron alojamientos')

    return lodgings;
  }

  async findLodgingById (id: string): Promise<Lodging> {
    const lodging = await this.lodgingRepository.findOneBy({lodging_id: id});
    if (!lodging) throw new NotFoundException (`No se encontró el alojamiento con id ${id}`)
    
    return lodging;  
  }

  async findLodgingsByType (type: LodgingType): Promise<Lodging[]> {
    const lodgings = await this.lodgingRepository.find({where: {type}})
    if (!lodgings.length) {
      throw new NotFoundException (`No se encontraron alojamientos de tipo ${type}`);
    }
    
    return lodgings;
  }

  async updateLodging (id: string, updateLodgingDto: UpdateLodgingDto) {
    const lodging = await this.lodgingRepository.preload({
      lodging_id: id,
      ...updateLodgingDto
    })
    if (!lodging) throw new NotFoundException (`No se encontró el alojamiento con id ${id}`)
    
    return await this.lodgingRepository.save(lodging);
  }

  async deleteLodging (id: string) {
    const lodging = await this.lodgingRepository.findOneBy({lodging_id: id})
    if (!lodging) throw new NotFoundException (`No se encontró el alojamiento con id ${id}`)
    
    return this.lodgingRepository.delete(lodging);
  }
}