import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Shipment } from 'src/app/models/shipment';

@Component({
  selector: 'app-shipment-history-item',
  templateUrl: './shipment-history-item.component.html',
  styleUrls: ['./shipment-history-item.component.scss'],
  animations: [
    trigger('detailsButtonAnimation', [
      state('true', style({ transform: 'translateY(0)' })), // When closed is true, no animation
      state('false', style({ transform: 'translateY(400px)' })), // When closed is false, move down by 30px
      transition('true => false', animate('300ms ease')), // Transition from true to false
      transition('false => true', animate('300ms ease')), // Transition from false to true
    ]),
  ],
})
export class ShipmentHistoryItemComponent {

  @Input() shipment!: Shipment;
  closed: boolean = true;

  toggleDetails() {
    this.closed = !this.closed;
  }

}
