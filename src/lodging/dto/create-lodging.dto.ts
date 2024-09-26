import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { LodgingType } from "../entities/lodging.entity";

export class CreateLodgingDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsOptional()
    image_lodging_url: string;
    
    @IsEnum(LodgingType, {
        message: "El tipo de alojamiento debe ser 'hotel' o 'camping'",
      })
    @IsNotEmpty()
    type: LodgingType;
}