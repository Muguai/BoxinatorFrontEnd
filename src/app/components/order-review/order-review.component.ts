import { Component, Input } from '@angular/core';
import { BoxType } from 'src/app/models/boxType';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.scss']
})
export class OrderReviewComponent {
  // order id
  @Input() id!: number; // USE FOR FUTURE API CALL

  public order: Order = {
    name: 'John Doe',
    shippingAddress: 'Some address',
    billingAddress: 'Some address',
    mail: 'john.doe@mail.com',
    zipCode: '12345',
    country: 'Sweden',
    instructions: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quo dicta sequi officia fugit. Corporis, facere odit maxime illum hic nesciunt, suscipit deserunt quidem accusantium, enim repellat at animi aliquam.',
    giftMessage: null,
    rate: 10,
    cost: 159,
    content: [
      {boxType: BoxType.ArcticAdventureBox, quantity: 2},
      {boxType: BoxType.ForestForagerBox, quantity: 1}
    ]
  }
}
