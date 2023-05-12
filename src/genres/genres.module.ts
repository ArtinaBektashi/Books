import { Module } from '@nestjs/common';
import { GenresController } from './genres.controller';
import { GenresService } from './genres.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genres } from './entities/genres.entities';

@Module({
  imports : [TypeOrmModule.forFeature([Genres])],
  controllers: [GenresController],
  providers: [GenresService]
})
export class GenresModule {}
