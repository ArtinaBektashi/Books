import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { PublishersModule } from './publishers/publishers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher } from './publishers/entities/publisher.entity';
import { Books } from './books/entities/books.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Authors } from './authors/entities/authors.entity';
import { AuthorsModule } from './authors/authors.module';
import { Genres } from './genres/entities/genres.entities';
import { GenresModule } from './genres/genres.module';
import { UsersModule } from './users/users.module';
import { Users } from './users/entities/users.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      inject : [ConfigService],
      useFactory: (config : ConfigService) => {
        return {
          type : 'postgres',
          host : config.get<string>('DB_HOST'),
          port : config.get<number>('DB_PORT'),
          username : config.get<string>('DB_USERNAME'),
          password : config.get<string>('DB_PASSWORD'),
          database : config.get<string>('DB_NAME'),
          entities: [Publisher, Books, Authors, Genres, Users ],
          synchronize: true,
          extra: {
            stripeSecretKey: config.get<string>('STRIPE_SECRET_KEY'),
            stripeCurrency: config.get<string>('STRIPE_CURRENCY'),
            frontendUrl: config.get<string>('FRONTEND_URL'),
          },
        }
      }
    }),
    BooksModule, PublishersModule, AuthorsModule, GenresModule, UsersModule, AuthModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
