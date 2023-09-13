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
    const savedCart = sessionStorage.getItem('cartData');
    if (savedCart) {
      const savedCartData = JSON.parse(savedCart);
      this.boxes = savedCartData.boxes;
    }
  }
}
