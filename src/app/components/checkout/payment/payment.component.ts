import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  @ViewChild('paymentForm') paymentForm!: NgForm;

  constructor(private readonly checkoutService: CheckoutService) {}
  
  checkValid(): void {
    // toggle "Place Order"-btn activation
    this.checkoutService.activatePlaceOrderBtn = this.paymentForm.valid!;
  }
}
