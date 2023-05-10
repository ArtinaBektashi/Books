import { IsEmail, IsString } from 'class-validator';
import { UserRole } from '../enums/user.enum';

export class UsersDTO {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  
  role: UserRole = UserRole.USER;

  @IsString()
  stripeCustomerId?: string;
}