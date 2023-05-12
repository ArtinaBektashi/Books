import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authors } from './entities/authors.entity';
import { BooksModule } from 'src/books/books.module';
import { BooksService } from 'src/books/books.service';
import { Books } from 'src/books/entities/books.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Authors])],
  controllers: [AuthorsController],
  providers: [AuthorsService],
  exports : [AuthorsService]
})
export class AuthorsModule {}
