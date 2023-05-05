import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { Books } from './entities/books.entity';
import { CreateBooksDto, UpdateBooksDto } from './dtos/books.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Observable } from 'rxjs';

@Controller('books')
export class BooksController {
    constructor(private booksService : BooksService){}

    @Get()
    @UseGuards(AuthGuard)

    async getBooks(
        @Query('take') take?: number,
        @Query('skip') skip?: number,
      ): Promise<Books[]> {
        return await this.booksService.getBooks({ take, skip });
      }

      
    @Get(':id')
    async getAuthor(@Param('id') id:number): Promise<Books>{
        return await this.booksService.getBook(id);
    }

    @Post()
    async createBooks(@Body() createBooksDto : CreateBooksDto, @Body('authorIds') authorIds?: number[]) : Promise<Books>{
        return await this.booksService.createBooks(createBooksDto, authorIds);
    }

    @Patch(':id')
    async updateBooks(@Param('id') id:number, @Body() updateBooksDto: UpdateBooksDto): Promise<Books>{
        return await this.booksService.updateBooks(id,updateBooksDto);
    }

    @Delete(':id')
    async removeBook(@Param('id') id:number){
        return await this.booksService.removeBook(id);
    }

}
