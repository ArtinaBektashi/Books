import { IsNumber, IsString , IsOptional, IsArray} from "class-validator";

export class CreateBooksDto{
    @IsString()
    title?: string;

    @IsNumber()
    totalPages?: number;

    @IsNumber()
    rating?: number;

    @IsString()
    isbn?:string;

    @IsString()
    published_date?: string;

    @IsString()
    image?:string;

    @IsArray()
    @IsNumber({}, { each: true })
    authorIds? : number[];

    @IsNumber()
    price?:number;
   
}

export class UpdateBooksDto{
    @IsString()
    @IsOptional()
    title: string;

    @IsNumber()
    @IsOptional()
    totalPages: number;

    @IsNumber()
    @IsOptional()
    rating: number;

    @IsString()
    @IsOptional()
    isbn:string;

    @IsString()
    @IsOptional()
    published_date: string;

    @IsNumber()
    price?:number;
}