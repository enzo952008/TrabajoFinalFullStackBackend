import { PartialType } from '@nestjs/mapped-types';
import { CreateRolDto } from './create.rol.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateRolDto extends PartialType(CreateRolDto) {
    @ApiPropertyOptional()
    name?: string;
 }