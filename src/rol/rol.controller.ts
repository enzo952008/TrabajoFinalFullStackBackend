import { Controller } from "@nestjs/common";
import { RolService } from "./rol.service";
import { Get } from "@nestjs/common";


@Controller('/roles')
export class RolController {
    constructor (private readonly rolService:RolService){}

    @Get()
    getAll(){
        return this.rolService.findAll();
    }

    
}