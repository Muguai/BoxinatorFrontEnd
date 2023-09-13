import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  shippingDetailsChange: EventEmitter<any> = new EventEmitter();

  constructor() { }
}
