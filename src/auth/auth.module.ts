import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/users.entity';
import { MailerService } from 'src/mailer/mailer.service';
import StripeService from 'src/stripe/stripe.service';
// import { MailerService } from 'src/mailer/mailer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    PassportModule,
  ],
  providers: [AuthService, MailerService,StripeService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}