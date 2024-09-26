import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity('roles')
export class Rol {
    @PrimaryGeneratedColumn('uuid')
    rol_id: string;

    @Column({ length: 50 })
    name: string;

    @OneToMany(() => User, user => user.rol)
    @JoinColumn({ name: 'rol_id' }) 
    user: User[];
}