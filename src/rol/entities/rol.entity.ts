import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn } from 'typeorm';


@Entity('roles') 
export class Rol {
    @PrimaryGeneratedColumn('uuid')
    rol_id : string;
    @Column({length:50})
    name: string;
}
