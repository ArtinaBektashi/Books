import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Stripe from "stripe";

@Injectable()
export default class StripeService {
  private stripe: Stripe;
 
  constructor(
    private configService: ConfigService
  ) {
    this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2022-11-15',
    });
  }

  public async createCustomer(name: string, email: string) : Promise<Stripe.Customer> {
    return this.stripe.customers.create({
      name,
      email
    });
  }

    public async chargeCustomer(
        customerId: string,
        amount: number,
        currency: string
    ): Promise<Stripe.Charge> {
        // const token= await this.stripe.tokens.create({
        //     card:{

        //     }
        // })
        return this.stripe.charges.create({
        amount,
        currency : this.configService.get('STRIPE_CURRENCY'),
        customer: customerId,
        // source:token.id
        });
    }
}