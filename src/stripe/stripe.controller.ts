import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Stripe } from 'stripe';
import StripeService from './stripe.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Users } from 'src/users/entities/users.entity';
import { GetCurrentUser, } from './decorator/get-current-user.decorator';
import { BooksService } from 'src/books/books.service';
import { UsersService } from 'src/users/users.service';


@Controller('stripe')
export class StripeController {

    private stripe: Stripe;
    constructor(private readonly stripeService: StripeService,
        private readonly booksService : BooksService,
        private readonly usersService : UsersService) { }

    @Post('purchase')
    @UseGuards(AuthGuard) 
    async purchase(@GetCurrentUser() user: Users, @Body('bookId') bookId: number) {
        const currentUser = await this.usersService.getUserByEmail(user.email)
    try {
        const stripeCustomerId = currentUser.stripeCustomerId; // Retrieve stripeCustomerId from the user object
        const charge = await this.booksService.purchaseBook(stripeCustomerId, bookId); // Pass stripeCustomerId to the purchaseBook method
        return { success: true, charge };
    } catch (error) {
        return { success: false, error: error.message };
    }
    }
}