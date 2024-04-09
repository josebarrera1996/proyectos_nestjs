import {
    Column,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Cat } from "src/cats/entities/cat.entity";

@Entity()
export class Breed {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    // Define la relación "Uno a Muchos" con la entidad Cat
    @OneToMany(() => Cat, (cat) => cat.breed) 
    cats: Cat[];

    @DeleteDateColumn()
    deletedAt: Date;
}
