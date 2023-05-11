import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Stripe } from 'stripe';
import StripeService from './stripe.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Users } from 'src/users/entities/users.entity';
import { GetCurrentUser, } from '../decorators/get-current-user.decorator';
import { BooksService } from 'src/books/books.service';
import { UsersService } from 'src/users/users.service';
import { CreditCardDto } from './card/card.dto';


@Controller('stripe')
export class StripeController {

    private stripe: Stripe;
    constructor(private readonly stripeService: StripeService,
        private readonly booksService : BooksService,
        private readonly usersService : UsersService) { }

        @Post('purchase/:bookId')
        @UseGuards(AuthGuard)
        async purchase(@GetCurrentUser() user: Users, @Param('bookId') bookId: number, @Body() card: CreditCardDto) {
        const currentUser = await this.usersService.getUserByEmail(user.email);
        try {
            const stripeCustomerId = currentUser.stripeCustomerId; 

            const charge = await this.booksService.purchaseBook(stripeCustomerId, bookId, card); 
            return { success: true, charge };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}