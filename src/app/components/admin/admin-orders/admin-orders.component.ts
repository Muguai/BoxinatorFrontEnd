import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderReviewPopupComponent } from '../order-review-popup/order-review-popup.component';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ReadShipmentDTO, mockShipment } from 'src/app/models/DTOs/Shipment/readShipmentDTO';
import { ShipmentService } from 'src/app/services/shipment-service/shipment.service';
import { Status } from 'src/app/models/status';
import { UpdateShipmentDTO } from 'src/app/models/DTOs/Shipment/updateShipmentDTO';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  // controls which columns to render and in what order
  displayedColumns: string[] = ['order', 'date', 'user', 'details', 'status'];
  orders: ReadShipmentDTO[] = [mockShipment];
  // array with Status values
  statuses: any[] = [];
  

  constructor(private dialog: MatDialog, private readonly authService: AuthenticationService,
    private readonly shipmentService: ShipmentService) {}

  ngOnInit(): void {
    this.fetchOrders();

    for (const key of Object.keys(Status)) {
      this.statuses.push({
        key: key,
        value: Status[key as keyof typeof Status]
      });
    }
  }

  async fetchOrders(): Promise<void> {
    const token = await this.authService.getToken();
    this.shipmentService.getShipments(token).subscribe({
      next: (res: ReadShipmentDTO[]) => {
        // make it possible to use toDateString() in template
        for (let box of res) {
          const date = new Date(box.created);
          box.created = date;
        }
        this.orders = res;
      },
      error: err => {
        console.error(err);
      }
    });
  }

  showDetails(order: ReadShipmentDTO): void {
    this.dialog.open(OrderReviewPopupComponent, {
      width: '570px',
      data: order
    });
  }

  async statusChange(order: ReadShipmentDTO): Promise<void> {
    const orderCopy = {...order};
    // convert from ReadShipmentDTO to UpdateShipmentDTO
    const uDTO = ((rDTO: ReadShipmentDTO) => {
      delete (rDTO as any).created;
      return rDTO as UpdateShipmentDTO;
    })(orderCopy);

    const token = await this.authService.getToken();
    this.shipmentService.putShipment(token, order.id, uDTO).subscribe({
      error: err => {
        console.error(err);
      }
    });
  }
}
