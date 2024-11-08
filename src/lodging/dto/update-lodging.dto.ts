import { PartialType } from '@nestjs/mapped-types';
import { CreateLodgingDto } from './create-lodging.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { LodgingType } from '../entities/lodging.entity';

export class UpdateLodgingDto extends PartialType(CreateLodgingDto) {
  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  image_lodging_url?: string;

  @ApiPropertyOptional({ enum: LodgingType })
  type?: LodgingType;

  @ApiPropertyOptional()
  contact_url?: string;
}