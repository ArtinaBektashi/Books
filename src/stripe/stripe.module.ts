import { Module } from '@nestjs/common';
import StripeService from './stripe.service';
import { StripeController } from './stripe.controller';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from 'src/books/books.module';
import { AuthorsModule } from 'src/authors/authors.module';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [ConfigModule, BooksModule, AuthorsModule, UsersModule],
    providers: [StripeService],
    controllers : [StripeController]
})
export class StripeModule {}
