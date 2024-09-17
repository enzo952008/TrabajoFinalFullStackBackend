
import { Rol } from "src/rol/entities/rol.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 255 })
  mail: string;

  @Column({ nullable: true })  // Indica que la columna puede ser NULL en la base de datos
  photo_profile_url: string;

  // @OneToOne(() => Rol, rol => rol.user)
  // @JoinColumn({ name: 'rol_id' })
  // rol: Rol;

  @ManyToOne(type => Rol, rol => rol.user)
  @JoinColumn({ name: 'rol_id' })
  rol: Rol;
}
