import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('food_places')
export class GastronomicPlace {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255 })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column()
    image_url: string;
}
