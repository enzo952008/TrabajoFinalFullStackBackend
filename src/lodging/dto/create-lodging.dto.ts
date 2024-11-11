import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";
import { LodgingType } from "../entities/lodging.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLodgingDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  image_lodging_url: string;

  @ApiProperty()
  @IsEnum(LodgingType, {
    message: "El tipo de alojamiento debe ser 'hotel' o 'camping'",
  })
  @IsNotEmpty()
  type: LodgingType;

  @ApiProperty()
  @IsUrl({}, { message: 'La URL de contacto debe ser válida' })
  @IsNotEmpty({ message: 'La URL de contacto es obligatoria' })
  contact_url: string;
}