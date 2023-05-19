import { Module } from '@nestjs/common';
import { ReadinglistController } from './readinglist.controller';
import { ReadinglistService } from './readinglist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReadingList } from './entities/reading-list.entity';
import { BooksModule } from 'src/books/books.module';
import { UsersModule } from 'src/users/users.module';
import { AuthorsModule } from 'src/authors/authors.module';

@Module({
  imports : [TypeOrmModule.forFeature([ReadingList]), BooksModule, UsersModule, AuthorsModule],
  controllers: [ReadinglistController],
  providers: [ReadinglistService]
})
export class ReadinglistModule {}
