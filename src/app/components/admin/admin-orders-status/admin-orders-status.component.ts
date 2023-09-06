import { Component, Input } from '@angular/core';
import { Status } from 'src/app/models/status';

@Component({
  selector: 'app-admin-orders-status',
  templateUrl: './admin-orders-status.component.html',
  styleUrls: ['./admin-orders-status.component.scss']
})
export class AdminOrdersStatusComponent {
  // current shipping status
  @Input() selected!: string;
  // array with Status values
  public statuses = Object.values(Status);
}
