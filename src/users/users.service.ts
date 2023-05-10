import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import { UserRole } from './enums/user.enum';
import StripeService from 'src/stripe/stripe.service';
import Stripe from 'stripe';

@Injectable()
export class UsersService {
    constructor( @InjectRepository(Users) private usersRepository:Repository<Users>,
    private stripeService : StripeService){}
    
    async getUserByEmail(email: string): Promise<Users> {
        return this.usersRepository.findOne({ where : {email} });
      }

      async getUsersById(id:number) : Promise<Users>{
        return this.usersRepository.findOne({where: {id}})
      }

      async updateUsersRole(userId: number, role:string) {
        if (!Object.values(UserRole).includes(role as UserRole)) {
            throw new BadRequestException('Invalid role value');
        }
        const user = await this.getUsersById(userId);

        if(!user){
            throw new NotFoundException('User not found');
        }

        user.role = role as UserRole;
        

        return await this.usersRepository.save(user);
      }

      async chargeCustomer(userId:number, amount:number,currency:string) : Promise<Stripe.Charge>{
        const user = await this.getUsersById(userId);

        if (!user) {
          throw new NotFoundException('User not found');
        }

        const customerId = user.stripeCustomerId;

        const charge = await this.stripeService.chargeCustomer(customerId,amount,currency);
        return charge;
      }
}
