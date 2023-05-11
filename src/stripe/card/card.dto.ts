import { IsString } from "class-validator";


export class CreditCardDto{

    @IsString()
    number : string;

    @IsString()
    exp_month: string;

    @IsString()
    exp_year : string;

    @IsString()
    cvc: string

    @IsString()
    zip: string
}