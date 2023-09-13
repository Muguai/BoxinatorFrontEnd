import { Component, OnInit } from '@angular/core';
import { Box } from 'src/app/models/mysteryBox';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  boxes: Box[] = [];

  constructor(readonly checkoutService: CheckoutService) {}

  ngOnInit(): void {
    const savedCart = sessionStorage.getItem('cartData');
    if (savedCart) {
      const savedCartData = JSON.parse(savedCart);
      this.boxes = savedCartData.boxes;
    }
  }

  placeOrder(): void {
    // DATA FOR POST REQUEST
    console.log(this.checkoutService.shippingDetails);
  }
}
