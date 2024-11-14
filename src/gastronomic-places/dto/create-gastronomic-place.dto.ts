import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, IsUrl } from 'class-validator';

export class CreateGastronomicPlaceDto {
 
  @ApiProperty()
  @IsString()
  @Length(1, 255, { message: 'El nombre debe tener entre 1 y 255 caracteres' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  description: string;

  @ApiProperty()
  @IsUrl({}, { message: 'La URL de la imagen debe ser válida' })
  @IsNotEmpty({ message: 'La URL de la imagen es obligatoria' })
  image_url: string;

  @ApiProperty()
  @IsUrl({}, { message: 'La URL de contacto debe ser válida' })
  @IsNotEmpty({ message: 'La URL de contacto es obligatoria' })
  contact_url: string;
}