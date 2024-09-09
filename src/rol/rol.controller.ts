import { Body, Controller, Post } from "@nestjs/common";
import { RolService } from "./rol.service";
import { Get } from "@nestjs/common";
import { CreateRolDto } from "./dto/create.rol.dto";


@Controller('/roles')
export class RolController {
    constructor (private readonly rolService:RolService){}

    @Get()
    getAll(){
        return this.rolService.findAll();
    }

    @Post()
        createRol (@Body() createRolDto:CreateRolDto){
            return this.rolService.createRol(createRolDto)
        }

    

    
}