import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'El correo electrónico debe ser válido' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  mail: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password: string;
}

