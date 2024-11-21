import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from './auth/dto/login.dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.mail, loginDto.password);
    return this.authService.login(user);
    
    
}

  /*@Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    // Validación adicional: asegurar que el email no esté ya registrado
    const existingUser = await this.authService.validateUser(createUserDto.mail, createUserDto.password);
    if (existingUser) {
      throw new BadRequestException('El correo electrónico ya está registrado');
    }

    // Crear usuario con AuthService
    const user = await this.authService.register(createUserDto);

    // Opcionalmente, iniciar sesión automáticamente después del registro
    return this.authService.login(user);
  }*/
}

