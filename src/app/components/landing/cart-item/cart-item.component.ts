import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2, AfterViewInit  } from '@angular/core';
import { Box } from 'src/app/models/mysteryBox';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  animations: [
    trigger('popInOut', [
      state(
        'in',
        style({
          transform: 'scale(0)',
        })
      ),
      state(
        'out',
        style({
          transform: 'scale(1.15)',
        })
      ),
      state(
        'final',
        style({
          transform: 'scale(1)',
        })
      ),
      transition('out => final', animate('300ms ease-out')),
      transition('in => out', animate('300ms ease-in')),
      transition('out => in', animate('300ms ease-out')),
    ]),
  ],
})
export class CartItemComponent implements AfterViewInit  {

  @Input() box!: Box;
  @Input() isRemoving: boolean = false;
  @Output() deleteCartItem = new EventEmitter<{ box: Box, deleteFully: boolean }>();
  @Output() addCartItem = new EventEmitter<Box>();
  @ViewChild('cartItem', { static: false }) cartItemRef!: ElementRef;
  currentState: string = 'in';

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

  
  addSpacesToPascalCase(inputString: string) {
    return inputString.replace(/([a-z])([A-Z])/g, '$1 $2');
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.currentState = "out";
      setTimeout(() => {
        this.currentState = "final";
      }, 400);
    }, 1);
  }



}
