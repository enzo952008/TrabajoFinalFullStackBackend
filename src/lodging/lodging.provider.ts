import { DataSource } from "typeorm";
import { Lodging } from "./entities/lodging.entity";


export const lodgingProviders=[
    {
        provide:'LODGING_REPOSITORY', 
        useFactory: (dataSource:DataSource) => dataSource.getRepository(Lodging),
        inject: ['DATA_SOURCE'],
    },
];