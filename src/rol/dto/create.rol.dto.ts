import {
    IsNumberString,
    IsString,
    Length,
    
  } from 'class-validator'

export class CreateRolDto{
    @IsString()
    @Length(1,50)
    name: string;

    @IsNumberString()
    rolId: number;

}