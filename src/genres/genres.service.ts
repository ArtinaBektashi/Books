import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Genres } from "./entities/genres.entities";
import { GenresDto } from "./dtos/genres.dto";


@Injectable()
export class GenresService {
  constructor(@InjectRepository(Genres) private repo: Repository<Genres>) {}

  async createGenre(genre: string, id?: number): Promise<Genres> {
    const newGenre = new Genres();
    newGenre.genre = genre;
  
    if (id) {
      const parent = await this.repo.findOne({where: {id}});
      newGenre.parent = parent;
    }
  
    return this.repo.save(newGenre);
  }

  async createSubgenre(createSubgenreDto: GenresDto, id: number): Promise<Genres> {
    const parent = await this.repo.findOne({where : {id}});
  
    const newSubgenre = new Genres();
    newSubgenre.genre = createSubgenreDto.genre;
    newSubgenre.parent = parent;
  
    return this.repo.insert(newSubgenre).then(() => newSubgenre);
  }

  async findAllGenres(): Promise<Genres[]> {
    return this.repo.find();
  }

  async findGenreById(id: number): Promise<Genres> {
    return this.repo.findOne({where: {id}});
  }
}
