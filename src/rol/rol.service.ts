import { Repository} from "typeorm";
import { Rol } from "./entities/rol.entity";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateRolDto } from "./dto/create.rol.dto";
import { UpdateRolDto } from "./dto/update.rol.dto";

@Injectable()
export class RolService{
    constructor(
        @Inject('ROL_REPOSITORY')
        private rolRepository: Repository<Rol>,
        
    ) { }

    async findAll(): Promise<Rol[]> {
        const roles = await this.rolRepository.find();
        if (!roles.length) throw new NotFoundException("No roles in database")
        return roles
    }

    async createRol(createRolDto:CreateRolDto): Promise<Rol>{
     const rol = this.rolRepository.create({
        ...createRolDto,
     })
     return await this.rolRepository.save(rol);
    }

    async updateRol(id: string, updateRolDto: UpdateRolDto) {

        const rol = await this.rolRepository.preload({
          rol_id: id,
          ...updateRolDto
        })
        if (!rol) throw new NotFoundException(`Rol with id ${id} not found`)
        return await this.rolRepository.save(rol)
      }

      async deleteRol (id:string){
        const rol = await this.rolRepository.findOneBy({rol_id: id})
        if (!rol) throw new NotFoundException(`Rol with id ${id} not found`)
            return this.rolRepository.delete(rol)
      }
}
