import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Users } from '../../users/entities/users.entity';
import { Books } from '../../books/entities/books.entity';

@Entity()
export class ReadingList {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.readingList)
  user: Users;

  @ManyToOne(() => Books, (book) => book.readingList)
  book: Books;
}