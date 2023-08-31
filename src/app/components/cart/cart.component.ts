import { Component, Input , EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  @Output() cartOpenChange = new EventEmitter<boolean>();

  constructor() {
  }

  @Input() cartOpen: boolean = false;

  toggleSidebar() {
    this.cartOpen = !this.cartOpen;
    this.cartOpenChange.emit(this.cartOpen);
    console.log("gets here");
  }

}