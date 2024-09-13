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

  async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ user_id: id });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }
  

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      user_id: id,
      ...updateUserDto
    })
    if (!user) throw new NotFoundException(`user with id ${id} not found`)
    return await this.userRepository.save(user)
  }

  async deleteUser (id:string){
    const user = await this.userRepository.findOneBy({user_id: id})
    if (!user) throw new NotFoundException(`User with id ${id} not found`)
        return this.userRepository.delete(user)
  }
}
