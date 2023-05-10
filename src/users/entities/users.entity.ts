import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../enums/user.enum';
import { IsOptional } from 'class-validator';


@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false, unique: true })
  email: string;
  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  resetToken: string; // New column for reset token

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({nullable: true})
  public stripeCustomerId : string;
}