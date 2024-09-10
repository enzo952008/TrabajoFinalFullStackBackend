import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity('roles')
export class Rol {
    @PrimaryGeneratedColumn('uuid')
    rol_id: string;

    @Column({ length: 50 })
    name: string;

    @OneToOne(() => User, user => user.rol)
    @JoinColumn({ name: 'rol_id' }) // La columna en la tabla 'roles' que actúa como clave foránea
    user: User;
}
