import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { rolProviders } from "./rol.providers";
import { RolService } from "./rol.service";
import { RolController } from "./rol.controller";

@Module({
    imports: [DatabaseModule],
    controllers: [RolController],
    providers: [
        ...rolProviders,  
        RolService,      
    ],
})
export class RolModule { }

