import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Genres } from "./entities/genres.entities";
import { GenresDto } from "./dtos/genres.dto";


@Injectable()
export class GenresService {
  constructor(@InjectRepository(Genres) private repo: Repository<Genres>) {}

  async createSubgenre(createSubgenreDto: GenresDto, parentId: number): Promise<Genres> {
    const parent = await this.repo.findOne({where : {id: parentId}});
  
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
