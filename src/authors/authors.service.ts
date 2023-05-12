import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Authors } from './entities/authors.entity';
import { In, Repository } from 'typeorm';
import { CreateAuthorsDto, UpdateAuthorsDto } from './dtos/task.dto';
@Injectable()
export class AuthorsService {
    constructor(@InjectRepository(Authors) private repo: Repository<Authors>) { }

    async getAuthors(): Promise<Authors[]> {
        return await this.repo.find();
    }

    async createAuthors(createAuthorsDto: CreateAuthorsDto): Promise<Authors> {
        return await this.repo.save(this.repo.create(createAuthorsDto));
    }

    async updateAuthors(authorsId: number, updateAuthorsDto: UpdateAuthorsDto): Promise<Authors> {
        const author = await this.getAuthor(authorsId)
        await this.repo.update((await author).id, updateAuthorsDto);
        return await this.getAuthor(authorsId);
    }

    async getAuthor(authorsId: number): Promise<Authors> {
        return await this.repo.findOneBy({ id: authorsId })
    }

    async removeAuthor(authorsId: number) {
        const author = await this.repo.findOneBy({id:authorsId})
        if(!author){
            throw new NotFoundException('Not found');
        }
        return await this.repo.delete(author.id)
    }

    async findByIds(authorIds: number[]) {
        const authors = this.repo.find({where: {id: In(authorIds)}})

        return authors;
    }
    
}
// a user that buys a book , now wants to see the featured book , which autor has written it, and the genre of the book 