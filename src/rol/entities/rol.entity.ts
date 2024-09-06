import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('roles') 
export class Rol {
    @PrimaryGeneratedColumn()
    rolId : number;
    @Column({length:50})
    name: string;
}
