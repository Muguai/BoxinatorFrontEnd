import { Component } from '@angular/core';
import { Order, Status } from 'src/app/models/adminOrders';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent {
  public displayedColumns: string[] = ['order', 'date', 'user',
  'details', 'status'];
 
  public orders: Order[] = [
    {order: 1001, date: '14/8 2023', user: 'john.doe@mail.com', status: Status.Placed},
    {order: 987, date: '1/8 2023', user: 'jane.doe@mail.com', status: Status.InTransit},
    {order: 771, date: '29/7 2023', user: 'john.doe@mail.com', status: Status.Delivered}
  ];
}
