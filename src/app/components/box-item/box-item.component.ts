
import { Component, Input } from '@angular/core';
import { Box } from 'src/app/models/mysteryBox';
import { CartService } from 'src/app/services/cart-service/cart-serivce.service';

@Component({
  selector: 'app-box-item',
  templateUrl: './box-item.component.html',
  styleUrls: ['./box-item.component.scss']
})
export class BoxItemComponent {

  @Input() box!: Box;

  constructor(private cartService: CartService) {}

  addItemToCart() {
    if(!this.box)
      return;

    this.cartService.addItemEvent.emit(this.box);
  }
}
