import { PartialType } from '@nestjs/mapped-types';
import { CreateGastronomicPlaceDto } from './create-gastronomic-place.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateGastronomicPlaceDto extends PartialType(CreateGastronomicPlaceDto) {
  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  image_url?: string;

  @ApiPropertyOptional()
  contact_url?: string;
}
