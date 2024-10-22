
import { Rol } from "src/rol/entities/rol.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column({type: 'varchar', length: 255 })
  name: string;

  @Column({type: 'varchar', length: 255 })
  password: string;

  @Column({type: 'varchar', length: 255, unique: true })
  mail: string;

  @Column({ nullable: true })  // Indica que la columna puede ser NULL en la base de datos
  photo_profile_url: string;

  @ManyToOne(type => Rol, rol => rol.user)
  @JoinColumn({ name: 'rol_id' })
  rol: Rol;
}