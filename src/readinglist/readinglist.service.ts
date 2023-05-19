import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReadingList } from './entities/reading-list.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { BooksService } from 'src/books/books.service';
import { AuthorsService } from 'src/authors/authors.service';

@Injectable()
export class ReadinglistService {
    constructor(@InjectRepository(ReadingList) private readingListRepo:Repository<ReadingList>,
    private usersService : UsersService, private booksService: BooksService, private authorsService : AuthorsService){}

    addReadingList(){
        
    }
}
