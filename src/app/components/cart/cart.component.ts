import { Component, Input} from '@angular/core';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  constructor() {
  }

  @Input() cartOpen: boolean = false;

  toggleSidebar() {
    this.cartOpen = !this.cartOpen;
    
    console.log("gets here");
  }

}