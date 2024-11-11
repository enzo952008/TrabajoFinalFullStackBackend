import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  Length,
} from 'class-validator'

export class CreateRolDto {
  @ApiProperty()
  @IsString()
  @Length(1, 50)
  name: string;
}