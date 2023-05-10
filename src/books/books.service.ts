import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Books } from './entities/books.entity';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { CreateBooksDto, UpdateBooksDto } from './dtos/books.dto';
import { AuthorsService } from 'src/authors/authors.service';
import { Observable, from } from 'rxjs';
import { Authors } from 'src/authors/entities/authors.entity';

@Injectable()
export class BooksService {
    constructor(@InjectRepository(Books) private repo : Repository<Books>,
    private authorsService : AuthorsService){}


    async getBooks({ take, skip }: { take?: number; skip?: number } = {}): Promise<Books[]> {
        const queryBuilder = this.repo.createQueryBuilder('books');
        
        if (take) {
            queryBuilder.take(take);
        }
        
        if (skip) {
            queryBuilder.skip(skip);
        }
        
        const books = await queryBuilder.leftJoinAndSelect('books.authors', 'authors').getMany();
        
        return books;
    }
    

    async createBooks(createBooksDto: CreateBooksDto, authorIds?: number[]) {
        let authors: Authors[] | undefined;
        if (authorIds) {
            authors = await this.authorsService.findByIds(authorIds);
          }
        const book = this.repo.create(createBooksDto);
        book.authors = authors;
        const savedBook = await this.repo.save(book);

        return savedBook;
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

    async findAll(query): Promise<{ data: Books[], count: number }> {
        const take = query.take || 10
        const skip = query.skip || 0
        const keyword = query.keyword || ''
    
        const [result, total] = await this.repo.findAndCount(
            {
                where: { title: Like('%' + keyword + '%') }, order: { title: "DESC" },
                take: take,
                skip: skip
            }
        );
    
        return {
            data: result,
            count: total
        }
    }

    async updateBookImage(bookId: number , imagePath: string) : Promise<Books>{
        const book = await this.getBook(bookId);
        book.image = imagePath;
        return await this.repo.save(book);
    }
    
}
