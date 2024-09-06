import { DataSource } from "typeorm";
import { Rol } from "./entities/rol.entity";


export const rolProviders=[
    {
        provide:'ROL_REPOSITORY', 
        useFactory: (dataSource:DataSource)=> dataSource.getRepository(Rol),
        inject: ['DATA_SOURCE'],
    },
];



