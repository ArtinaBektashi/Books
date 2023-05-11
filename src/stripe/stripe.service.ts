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
  public async chargeCustomer(customerId
  ): Promise<Stripe.Charge> {
    const cardToken = await this.stripe.tokens.create({
      card: {
        number: '4242424242424242', 
        exp_month: "12",
        exp_year: "2024", 
        cvc: '123' 
      }
    });
    
    const source = await this.stripe.customers.createSource(customerId, {
      source: cardToken.id,
    });

    return this.stripe.charges.create({
      amount : 200,
      currency: this.configService.get('STRIPE_CURRENCY'),
      customer: customerId,
      source: source.id,
    });
  }
}