import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import StripeService from 'src/stripe/stripe.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users]),
  UsersModule],
  controllers: [UsersController],
  providers: [UsersService,StripeService],
  exports : [UsersService]
})
export class UsersModule {}
