import { Injectable } from '@nestjs/common'; // Importa el decorador Injectable de NestJS
import { PassportStrategy } from '@nestjs/passport'; // Importa la clase PassportStrategy de Passport
import { ExtractJwt, Strategy } from 'passport-jwt'; // Importa ExtractJwt y Strategy de passport-jwt

// Decorador que marca esta clase como un proveedor que puede ser inyectado
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // Llama al constructor de la clase base PassportStrategy con las configuraciones necesarias
    super({
      // Extrae el token JWT del encabezado de la solicitud como un Bearer Token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // No ignorar la expiración del token
      ignoreExpiration: false,
      // Clave secreta utilizada para firmar el token; se puede configurar a través de una variable de entorno
      secretOrKey: process.env.JWT_SECRET || 'secretKey',
    });
  }

  // Método que se llama para validar el token
  async validate(payload: any) {
    // Retorna el ID de usuario y el nombre de usuario desde el payload del token
    return { userId: payload.sub, username: payload.username };
  }
}

