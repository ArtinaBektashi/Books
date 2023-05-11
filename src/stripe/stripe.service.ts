import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Stripe from "stripe";
import { CreditCardDto } from "./card/card.dto";

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

  public async createProduct(title: string, price: number): Promise<Stripe.Product> {
    const product = await this.stripe.products.create({
      name: title,
      type: 'service',
    });
  
    await this.stripe.prices.create({
      product: product.id,
      unit_amount: price * 100, 
      currency: this.configService.get('STRIPE_CURRENCY'),
    });
  
    return product;
  }

  public async createCustomer(name: string, email: string) : Promise<Stripe.Customer> {
    return this.stripe.customers.create({
      name,
      email
    });
  }
  public async chargeCustomer(customerId , card: CreditCardDto, amount: number,
    productId: string,
  ): Promise<Stripe.Charge> {
    const cardToken = await this.stripe.tokens.create({
      card: {
        number: card.number, 
        exp_month: card.exp_month,
        exp_year: card.exp_year, 
        cvc: card.cvc,
        address_zip : card.zip, 
      }
    });
    
    const source = await this.stripe.customers.createSource(customerId, {
      source: cardToken.id,
    });

    return this.stripe.charges.create({
      amount : amount,
      currency: this.configService.get('STRIPE_CURRENCY'),
      customer: customerId,
      source: source.id,
      metadata: {
        product_id: productId, 
      },
    });
  }
}