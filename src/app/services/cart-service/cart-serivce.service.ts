import { EventEmitter, Injectable } from '@angular/core';
import { Box } from 'src/app/models/mysteryBox';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  addItemEvent: EventEmitter<Box> = new EventEmitter();
  cartOpenChange: EventEmitter<boolean> = new EventEmitter();
  cartAmountChange: EventEmitter<number> = new EventEmitter();
  toggleCart = new EventEmitter();
}