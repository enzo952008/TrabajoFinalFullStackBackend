import { DataSource } from "typeorm";
import { GastronomicPlace } from "./entities/gastronomic-place.entity";


export const gastronomiProviders=[
    {
        provide:'GASTRONOMIC_PLACE_REPOSITORY', 
        useFactory: (dataSource:DataSource)=> dataSource.getRepository(GastronomicPlace),
        inject: ['DATA_SOURCE'],
    },
];