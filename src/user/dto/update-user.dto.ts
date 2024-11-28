import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';  // Usa ApiPropertyOptional
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  password?: string;

  @ApiPropertyOptional()
  mail?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly photo_profile_url: string;


  @ApiPropertyOptional()
  rol_id?: string;
}
