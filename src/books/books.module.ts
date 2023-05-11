import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { Books } from './entities/books.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './books.controller';
import { AuthorsModule } from 'src/authors/authors.module';
import StripeService from 'src/stripe/stripe.service';
import { UsersService } from 'src/users/users.service';
import { Users } from 'src/users/entities/users.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Books]), 
  AuthorsModule,TypeOrmModule.forFeature([Users])],
  controllers: [BooksController],
  providers: [BooksService, UsersService, StripeService, AuthGuard],
  exports : [BooksService]
})
export class BooksModule {}
