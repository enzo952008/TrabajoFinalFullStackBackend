import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';

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

  async login(user: User) {
    const payload = { 
      sub: user.user_id, 
      username: user.name, // Incluye el nombre del usuario
      mail: user.mail // Mantén el correo si es necesario
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
