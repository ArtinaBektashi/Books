import { Module } from '@nestjs/common';
import StripeService from './stripe.service';
import { StripeController } from './stripe.controller';
import { ConfigModule } from '@nestjs/config';
import { BooksService } from 'src/books/books.service';
import { Books } from 'src/books/entities/books.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsService } from 'src/authors/authors.service';
import { UsersService } from 'src/users/users.service';
import { Authors } from 'src/authors/entities/authors.entity';
import { Users } from 'src/users/entities/users.entity';

@Module({
    imports: [ConfigModule, TypeOrmModule.forFeature([Books]), TypeOrmModule.forFeature([Authors]), TypeOrmModule.forFeature([Users])],
    providers: [StripeService, BooksService, AuthorsService, UsersService],
    controllers : [StripeController]
})
export class StripeModule {}
