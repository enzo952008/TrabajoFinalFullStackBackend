import { IsString, IsNotEmpty, IsEmail, IsOptional, isStrongPassword, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

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

    @IsEmail()
    @IsNotEmpty()
    readonly mail: string;

    @IsOptional()
    @IsString()
    readonly photo_profile_url: string;

    @IsString()
    readonly rol_id: string;

}

