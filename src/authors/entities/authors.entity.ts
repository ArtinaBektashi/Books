import { Books } from 'src/books/entities/books.entity';
import {PrimaryGeneratedColumn , Column, JoinTable, ManyToMany , Entity} from 'typeorm';

@Entity()
export class Authors{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    firstName:string;

    @Column()
    middleName: string;

    @Column()
    lastName: string;

    @ManyToMany(() => Books)
    @JoinTable()
    books: Books[]

}