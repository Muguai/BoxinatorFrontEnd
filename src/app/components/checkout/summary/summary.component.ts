import { Component, Input, OnInit } from '@angular/core';
import { Box } from 'src/app/models/mysteryBox';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  @Input() boxes!: Box[];
  orderSum: number = 0;

  ngOnInit(): void {
    // calc total price for order
    for (const box of this.boxes) {
      this.orderSum += box.price * box.amount;
    }
    // round to two decimals
    this.orderSum = Number(this.orderSum.toFixed(2));
  }
}
