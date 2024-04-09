import {
    Column,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { Breed } from "src/breeds/entities/breed.entity";
import { User } from "src/users/entities/user.entity";

@Entity()
export class Cat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    // Define la relación "Muchos a Uno" con la entidad Breed
    @ManyToOne(() => Breed, (breed) => breed.id, {
        eager: true, // Indica que al recuperar un gato, también se debe cargar de forma 'eager' su raza asociada
    })
    breed: Breed;

    // Define la relación "Muchos a Uno" con la entidad User
    @ManyToOne(() => User)
    @JoinColumn({ name: 'userEmail', referencedColumnName: 'email', }) // Define el nombre de la columna y la referencia externa
    user: User; // Usuario dueño del gato

    @Column()
    userEmail: string;

    @DeleteDateColumn()
    deletedAt: Date;
}
