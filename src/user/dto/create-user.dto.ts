import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
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

