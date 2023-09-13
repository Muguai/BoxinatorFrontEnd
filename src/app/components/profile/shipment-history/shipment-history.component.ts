import { Component } from '@angular/core';
import dummyShipments, { Shipment } from 'src/app/models/shipment';

@Component({
  selector: 'app-shipment-history',
  templateUrl: './shipment-history.component.html',
  styleUrls: ['./shipment-history.component.scss']
})
export class ShipmentHistoryComponent {

    shipments!: Shipment[]; 
    constructor() {
      this.shipments = dummyShipments;
    }
}
