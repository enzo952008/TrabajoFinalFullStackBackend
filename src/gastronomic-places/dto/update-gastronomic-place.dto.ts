import { PartialType } from '@nestjs/mapped-types';
import { CreateGastronomicPlaceDto } from './create-gastronomic-place.dto';

export class UpdateGastronomicPlaceDto extends PartialType(CreateGastronomicPlaceDto) {}
