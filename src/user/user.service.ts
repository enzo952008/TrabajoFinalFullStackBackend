import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor (
    @Inject ('USER_REPOSITORY')
    private userRepository: Repository<User>
  ){}

   async createUser(createUserDto: CreateUserDto) : Promise <User> {
    const user = this.userRepository.create(createUserDto)
    return this.userRepository.save (user);
  }

   async findAllUsers(): Promise <User[]> {
    const users = await this.userRepository.find ()
    if (!users.length) throw new NotFoundException (`no se encontraron usuarios`)
      return users
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
