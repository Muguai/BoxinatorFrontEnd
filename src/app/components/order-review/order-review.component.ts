import { Component, Input, OnInit } from '@angular/core';
import { BoxType } from 'src/app/models/DTOs/Box/readBoxDTO';
import { Box } from 'src/app/models/mysteryBox';
import { Order, OrderContent } from 'src/app/models/order';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.scss']
})
export class OrderReviewComponent implements OnInit {
  // order id
  @Input() id?: number; // USE FOR FUTURE API CALL
  @Input() boxes?: Box[];
  order?: Order;
  totalCost?: number;

  constructor(private readonly checkoutService: CheckoutService) {}

  ngOnInit(): void {
    if (this.id) {
      this.populateById();
    } else {
      this.populateByOrderDetails();
    }
  }

  private populateById() {
    // DUMMY POPULATION, USE API DATA LATER
    this.order = {
      name: 'John Doe',
      mail: 'john.doe@mail.com',
      shippingAddress: 'Some address',
      billingAddress: 'Some address',
      zipCode: '12345',
      country: 'Sweden',
      instructions: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quo dicta sequi officia fugit. Corporis, facere odit maxime illum hic nesciunt, suscipit deserunt quidem accusantium, enim repellat at animi aliquam.',
      giftMessage: null,
      rate: 10,
      cost: 159,
      content: [
        {boxType: BoxType.ArcticAdventureBox, quantity: 1},
        {boxType: BoxType.ForestForagerBox, quantity: 1}
      ]
    };
    this.totalCost = 169;
  }

  private populateByOrderDetails() {
    this.checkoutService.shippingDetailsChange.subscribe(() => {
      const shippingDetailsData = this.checkoutService?.shippingDetails;

      // calc total price for order
      let orderSum: number = 0;
      for (const box of this.boxes!) {
        orderSum += box.price * box.amount;
      }
      // round to two decimals
      orderSum = Number(orderSum.toFixed(2));

      // turn to type OrderContent - ONLY FOR DEV PURPOSES
      let orderContent: OrderContent[] = [];
      for (const box of this.boxes!) {
        let orderBox: OrderContent = {
          boxType: <BoxType> box.boxType,
          quantity: box.amount
        }
        orderContent.push(orderBox);
      }
      
      this.totalCost = orderSum + shippingDetailsData?.countryRate;
      this.order = {
        name: shippingDetailsData?.name,
        mail: shippingDetailsData?.mail,
        shippingAddress: shippingDetailsData?.shippingAddress,
        billingAddress: shippingDetailsData?.billingAddress,
        zipCode: shippingDetailsData?.zipCode,
        country: shippingDetailsData?.countryName,
        instructions: shippingDetailsData?.instructions,
        giftMessage: shippingDetailsData?.giftMessage,
        rate: shippingDetailsData?.countryRate,
        cost: orderSum,
        content: orderContent
      };
    });
  }
}
