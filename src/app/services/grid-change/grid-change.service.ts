import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GridChangeService {
  gridChangeEvent: EventEmitter<{row: number, column:number, gridItemWidth:string, gridGap:string}> = new EventEmitter();
}
