import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Books } from './entities/books.entity';
import { Repository } from 'typeorm';
import { CreateBooksDto, UpdateBooksDto } from './dtos/books.dto';
import { AuthorsService } from 'src/authors/authors.service';

@Injectable()
export class BooksService {
    constructor(@InjectRepository(Books) private repo : Repository<Books>,
    private authorsService : AuthorsService){}

    async getBooks(): Promise<Books[]> {
        return await this.repo.find();
    }

    async createBooks(createBooksDto: CreateBooksDto, authorIds : number[]) {
        const authors= await this.authorsService.findByIds(authorIds);
        const book = this.repo.create(createBooksDto);
        book.authors = authors;
        return await this.repo.save(book);
    }

    async updateBooks(booksId: number, updateBooksDto: UpdateBooksDto): Promise<Books> {
        const books = await this.getBook(booksId)
        await this.repo.update((await books).id, updateBooksDto);
        return await this.getBook(booksId);
    }

    async getBook(booksId: number): Promise<Books> {
        return await this.repo.findOne({ where : {id: booksId }, relations :['authors']})
    }

    async removeBook(booksId: number) {
        const books = await this.repo.findOneBy({id:booksId})
        if(!books){
            throw new NotFoundException('Not found');
        }
        return await this.repo.delete(books.id)
    }
}
