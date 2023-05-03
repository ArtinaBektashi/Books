import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { Authors } from './entities/authors.entity';
import { CreateAuthorsDto, UpdateAuthorsDto } from './dtos/task.dto';

@Controller('authors')
export class AuthorsController {
    constructor(private authorsService : AuthorsService){}

    @Get()
    async getAuthors(): Promise<Authors[]>{
        return await this.authorsService.getAuthors();
    }

    @Get(':id')
    async getAuthor(@Param('id') id:number): Promise<Authors>{
        return await this.authorsService.getAuthor(id);
    }

    @Post()
    async createAuthors(@Body() createAuthorsDto : CreateAuthorsDto) : Promise<Authors>{
        return await this.authorsService.createAuthors(createAuthorsDto);
    }

    @Patch(':id')
    async updateAuthors(@Param('id') id:number, @Body() updateAuthorsDto: UpdateAuthorsDto): Promise<Authors>{
        return await this.authorsService.updateAuthors(id,updateAuthorsDto);
    }

    @Delete(':id')
    async removeAuthor(@Param('id') id:number){
        return await this.authorsService.removeAuthor(id);
    }
}
