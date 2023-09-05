
import { Component, Input, ElementRef, Renderer2  } from '@angular/core';
import { Box } from 'src/app/models/mysteryBox';
import { CartService } from 'src/app/services/cart-service/cart-serivce.service';

@Component({
  selector: 'app-box-item',
  templateUrl: './box-item.component.html',
  styleUrls: ['./box-item.component.scss']
})
export class BoxItemComponent {

  @Input() box!: Box;

  constructor(public elementRef: ElementRef, private renderer: Renderer2, private cartService: CartService) {}

  addItemToCart() {
    if(!this.box)
      return;

    this.cartService.addItemEvent.emit(this.box);
  }

  freeze() {
    this.renderer.addClass(this.elementRef.nativeElement, 'frozen');
    setTimeout(() => {
      this.unfreeze();
    }, 3000); // 3000 milliseconds (3 seconds) to freeze the item
  }

  unfreeze() {
    this.renderer.removeClass(this.elementRef.nativeElement, 'frozen');
  }
}
