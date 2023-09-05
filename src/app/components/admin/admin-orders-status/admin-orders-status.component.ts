import { Component, Input } from '@angular/core';
import { Status } from 'src/app/models/adminOrders';

@Component({
  selector: 'app-admin-orders-status',
  templateUrl: './admin-orders-status.component.html',
  styleUrls: ['./admin-orders-status.component.scss']
})
export class AdminOrdersStatusComponent {
  @Input() selected: string = '';
  public statuses = Object.values(Status);
}
