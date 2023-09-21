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

  checkInput(inputs: any[]): boolean {
    if (inputs.includes(null) || inputs.includes('') || inputs.includes(undefined)) {
      return false;
    }
    return true;
  }
}
