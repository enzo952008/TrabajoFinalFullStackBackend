import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum LodgingType {
    HOTEL = 'hotel',
    CAMPING = 'camping',
}

@Entity('lodgings')
export class Lodging {
    @PrimaryGeneratedColumn('uuid')
    lodging_id: string;
    
    @Column({ length: 255 })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column()
    image_lodging_url: string;

    @Column({
        type: 'enum',
        enum: LodgingType,
    })
    type: LodgingType;

}
