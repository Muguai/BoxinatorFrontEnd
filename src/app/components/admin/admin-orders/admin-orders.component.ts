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
    {order: 1001, date: '14/8 2023', user: 'john.doe@mail.com'},
    {order: 987, date: '1/8 2023', user: 'jane.doe@mail.com'},
    {order: 771, date: '29/7 2023', user: 'john.doe@mail.com'}
  ];

  public statuses: Status[] = [
    {title: 'Order Placed', value: 'Placed'},
    {title: 'Order Processing', value: 'Processing'},
    {title: 'Order Cancelled', value: 'Cancelled'},
    {title: 'Packing', value: 'Packing'},
    {title: 'Shipped', value: 'Shipped'},
    {title: 'In Transit', value: 'In Transit'},
    {title: 'Out For Delivery', value: 'Out For Delivery'},
    {title: 'Delivered', value: 'Delivered'},
    {title: 'Attempted Delivery', value: 'Attempted Delivery'},
    {title: 'Lost in Transit', value: 'Lost in Transit'},
    {title: 'Delayed', value: 'Delayed'},
    {title: 'Exception', value: 'Exception'}
  ]
}
