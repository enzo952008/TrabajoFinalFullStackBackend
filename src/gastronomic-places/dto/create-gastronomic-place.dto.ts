import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl, Length } from 'class-validator';

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

  @ApiProperty({ required: false })
  @IsUrl({}, { message: 'La URL de la imagen debe ser válida' })
  @IsOptional()
  image_url?: string; // Ahora este campo es opcional, porque lo genera el backend.

  @ApiProperty()
  @IsUrl({}, { message: 'La URL de contacto debe ser válida' })
  @IsNotEmpty({ message: 'La URL de contacto es obligatoria' })
  contact_url: string;
}
