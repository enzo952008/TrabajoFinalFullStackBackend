import { Body, Controller, Delete, Param, Patch, Post } from "@nestjs/common";
import { RolService } from "./rol.service";
import { Get } from "@nestjs/common";
import { CreateRolDto } from "./dto/create.rol.dto";
import { UpdateRolDto } from "./dto/update.rol.dto";


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

    @Patch('/:id')
        updateRol (
            @Param('id') id: string,
            @Body()updateRolDto: UpdateRolDto
        ){
                return this.rolService.updateRol(id, updateRolDto)
            }

    @Delete ('/:id')   
            deleteRol (
                @Param('id') id: string,
            ){
                return this.rolService.deleteRol (id)
            }

    

    
}


