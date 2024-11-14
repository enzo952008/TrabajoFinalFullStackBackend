import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';  // Usa ApiPropertyOptional
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  password?: string;

  @ApiPropertyOptional()
  mail?: string;

  @ApiPropertyOptional()
  photo_profile_url?: string;

  @ApiPropertyOptional()
  rol_id?: string;
}
