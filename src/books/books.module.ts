import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { Books } from './entities/books.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './books.controller';
import { AuthorsModule } from 'src/authors/authors.module';

@Module({
  imports: [TypeOrmModule.forFeature([Books]), 
  AuthorsModule],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
