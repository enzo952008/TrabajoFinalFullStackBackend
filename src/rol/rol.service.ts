import { Repository} from "typeorm";
import { Rol } from "./entities/rol.entity";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateRolDto } from "./dto/create.rol.dto";

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

    async createOne(createRolDto:CreateRolDto): Promise<Rol>{
     const rol = this.rolRepository.create({
        ...createRolDto,
     })
     return await this.rolRepository.save(rol);
    }
}
