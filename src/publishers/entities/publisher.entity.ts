import { Books } from 'src/books/entities/books.entity';
import {Column , PrimaryGeneratedColumn , OneToMany, Entity} from 'typeorm';

@Entity()
export class Publisher{
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @OneToMany(() => Books , (books) => books.publisher )
    books : Books[]
}