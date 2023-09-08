import { Component } from '@angular/core';
import { Order } from 'src/app/models/adminOrders';
import { MatDialog } from '@angular/material/dialog';
import { OrderReviewPopupComponent } from '../order-review-popup/order-review-popup.component';
import { Status } from 'src/app/models/status';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent {
  // controls which columns to render and in what order
  public displayedColumns: string[] = ['order', 'date', 'user', 'details', 'status'];
  public orders: Order[] = [
    {id: 1001, date: '14/8 2023', user: 'john.doe@mail.com', status: Status.Placed},
    {id: 987, date: '1/8 2023', user: 'jane.doe@mail.com', status: Status.InTransit},
    {id: 771, date: '29/7 2023', user: 'john.doe@mail.com', status: Status.Delivered}
  ];
  // array with Status values
  public statuses = Object.values(Status);

  constructor(private dialog: MatDialog) {}

  public showDetails(value: number): void {
    this.dialog.open(OrderReviewPopupComponent, {
      width: '570px',
      data: {id: value}
    });
  }

  public statusChange(value: string): void {
    console.log(value)
  }
}
