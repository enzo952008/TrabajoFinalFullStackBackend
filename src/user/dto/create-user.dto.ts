import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsOptional, isStrongPassword, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsStrongPassword(
        {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        },
        {
            message:
            "La contraseña debe contener un mínimo de 8 caracteres, y al menos 1 mayúscula, 1 minúscula, 1 número y un carácter especial",
        }
    )
    readonly password: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    readonly mail: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly photo_profile_url: string;

    @ApiProperty()
    @IsString()
    readonly rol_id: string;

}

