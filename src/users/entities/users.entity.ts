import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserRole } from '../enums/user.enum';
import { IsOptional } from 'class-validator';
import { ReadingList } from 'src/readinglist/entities/reading-list.entity';


@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false, unique: true })
  email: string;
  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  resetToken: string; 

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({nullable: true})
  public stripeCustomerId : string;

  @OneToMany(() => ReadingList, (readingList) => readingList.user)
  readingList: ReadingList[];
}