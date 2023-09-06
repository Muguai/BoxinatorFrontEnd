import { Component, Input } from '@angular/core';
import { Order, BoxType } from 'src/app/models/order';

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.scss']
})
export class OrderReviewComponent {
  @Input() id!: number;

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
