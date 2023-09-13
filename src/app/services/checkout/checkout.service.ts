import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  shippingDetailsChange: EventEmitter<any> = new EventEmitter();
  shippingDetails: any;
  activatePlaceOrderBtn: boolean = false;
  activateReviewPaymentTabs: boolean = false;

  constructor() { }
}
