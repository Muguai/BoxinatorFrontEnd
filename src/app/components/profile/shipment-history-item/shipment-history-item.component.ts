import { Component, Input } from '@angular/core';
import { Shipment } from 'src/app/models/shipment';

@Component({
  selector: 'app-shipment-history-item',
  templateUrl: './shipment-history-item.component.html',
  styleUrls: ['./shipment-history-item.component.scss'],
})
export class ShipmentHistoryItemComponent {

  @Input() shipment!: Shipment;
  closed: boolean = true;

  toggleDetails() {
    this.closed = !this.closed;
  }

  getShipmentTotalCost(){
  

    let total = 0;

    this.shipment.content.forEach(element => {
        total += (element.Box.price * element.Box.amount);
    });

    return total;
  }

}
