import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor( @InjectRepository(Users) private usersRepository:Repository<Users>){}
    
    async getUserByEmail(email: string): Promise<Users> {
        return this.usersRepository.findOne({ where : {email} });
      }
}
