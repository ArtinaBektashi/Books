import { IsEmail, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../enums/user.enum';

export class UsersDTO {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  
  role: UserRole = UserRole.USER;

  stripeCustomerId: string;
}