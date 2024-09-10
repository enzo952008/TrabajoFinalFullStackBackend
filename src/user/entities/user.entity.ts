import { Rol } from "src/rol/entities/rol.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity ('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    user_id: string;

    @Column({length:255})
    name: string;

    @Column({length:255})
    password: string;

    @Column ({length:255})
    mail: string;

    @Column()
    photo_profile_url: string;

    @OneToOne(() => Rol, rol => rol.user)
    @JoinColumn({ name: 'rol_id' }) // Define 'rol_id' como clave foránea en la tabla 'users'
    rol: Rol;
}
