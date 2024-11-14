import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // Registro de usuario
  async register(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });

    return user;
  }

  
  // Validar usuario al iniciar sesión
  async validateUser(mail: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(mail);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Credenciales inválidas');
  }

  async login(user: any) {
    console.log('Contenido de user:', user); // Esto te mostrará el contenido de user en la consola
  
    if (!user) {
      throw new UnauthorizedException('Usuario no válido');
    }
  
    const payload = { username: user.mail, sub: user.user_id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
