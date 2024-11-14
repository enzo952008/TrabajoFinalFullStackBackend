import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  private readonly saltRounds = 10;

  // Crear un usuario con contraseña encriptada
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // Extraer la contraseña del DTO y luego encriptarla
    const { password, ...userData } = createUserDto;
    const hashedPassword = await this.hashPassword(password);

    // Crear el usuario con la contraseña encriptada
    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  // Método para encriptar contraseñas
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(password, salt);
  }

  // Buscar todos los usuarios
  async findAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    if (!users.length) {
      throw new NotFoundException(`No se encontraron usuarios`);
    }
    return users;
  }

  // Buscar un usuario por ID
  async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ user_id: id });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

  // Buscar un usuario por correo electrónico
  async findByEmail(mail: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ mail });
    if (!user) {
      throw new NotFoundException(`Usuario con el correo ${mail} no encontrado`);
    }
    return user;
  }

  // Actualizar un usuario
  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      user_id: id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return await this.userRepository.save(user);
  }

  // Eliminar un usuario
  async deleteUser(id: string) {
    const user = await this.userRepository.findOneBy({ user_id: id });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return this.userRepository.delete(user);
  }

  // Validar contraseña (si es necesario)
  async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

