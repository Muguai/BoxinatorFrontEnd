import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-order-review-popup',
  templateUrl: './order-review-popup.component.html',
  styleUrls: ['./order-review-popup.component.scss']
})
export class OrderReviewPopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
