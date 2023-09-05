import { EventEmitter, Injectable } from '@angular/core';
import { Box } from 'src/app/models/mysteryBox';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  addItemEvent: EventEmitter<Box> = new EventEmitter();
}