import { Component, OnInit } from '@angular/core';
import { Box } from 'src/app/models/mysteryBox';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  public boxes: Box[] = [];

  ngOnInit(): void {
    const savedCartData = sessionStorage.getItem('cartData');
    if (savedCartData) {
      const cartData = JSON.parse(savedCartData);
      this.boxes = cartData.boxes;
    }
  }
}
