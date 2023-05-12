import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { GenresService } from './genres.service';
import { Genres } from './entities/genres.entities';
import { GenresDto } from './dtos/genres.dto';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
  async createGenre(@Body() createGenreDto: GenresDto, @Query('parentId') parentId?: number): Promise<Genres> {
    const { genre } = createGenreDto;
  
    return this.genresService.createGenre(genre, parentId);
  }

  @Post('subgenre')
    async createSubgenre(@Body() createSubgenreDto: GenresDto, @Body('parentId') parentId: number): Promise<Genres> {
    return this.genresService.createSubgenre(createSubgenreDto, parentId);
    }

  @Get()
  async findAllGenres(): Promise<Genres[]> {
    return this.genresService.findAllGenres();
  }

  @Get(':id')
  async findGenreById(@Param('id') id: number): Promise<Genres> {
    return this.genresService.findGenreById(id);
  }
}
