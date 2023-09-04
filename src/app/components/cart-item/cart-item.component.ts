import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2  } from '@angular/core';
import { Box } from 'src/app/models/mysteryBox';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {

  @Input() box!: Box;
  @Input() isRemoving: boolean = false;
  @Output() deleteCartItem = new EventEmitter<{ box: Box, deleteFully: boolean }>();
  @Output() addCartItem = new EventEmitter<Box>();
  @ViewChild('cartItem', { static: false }) cartItemRef!: ElementRef;

  constructor(private renderer: Renderer2) {}

  incrementCount() {
    if (this.box.amount < 99 && !this.isRemoving) {
      this.addCartItem.emit(this.box)
    }
  }

  decrementCount() {
    if(this.isRemoving)
      return;
    this.deleteCartItem.emit({box: this.box, deleteFully: false});
    if(this.box.amount < 1){
      this.isRemoving = true;
    }
  }

  deleteItem(){
    if(this.isRemoving)
      return;
    this.deleteCartItem.emit({box: this.box, deleteFully: true});
    this.isRemoving = true;
  }

  onAnimationEnd(event: AnimationEvent) {
    if (event.animationName.includes('slide-out')) {
      this.renderer.addClass(this.cartItemRef.nativeElement, 'remove2');
    }
  }


}
