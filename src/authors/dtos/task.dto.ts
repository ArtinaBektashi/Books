import { IsOptional, IsString } from "class-validator";

export class CreateAuthorsDto{
    @IsString()
    firstName:string;

    @IsString()
    middleName: string;

    @IsString()
    lastName: string;
}

export class UpdateAuthorsDto{
    @IsString()
    @IsOptional()
    firstName:string;

    @IsString()
    @IsOptional()
    middleName: string;

    @IsString()
    @IsOptional()
    lastName: string;
}