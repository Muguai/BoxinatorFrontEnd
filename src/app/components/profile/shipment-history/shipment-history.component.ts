import { Component, OnInit } from '@angular/core';
import dummyShipments, { Shipment } from 'src/app/models/shipment';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ShipmentService } from 'src/app/services/shipment-service/shipment.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-shipment-history',
  templateUrl: './shipment-history.component.html',
  styleUrls: ['./shipment-history.component.scss']
})
export class ShipmentHistoryComponent implements OnInit {

  shipments: Shipment[] = [];
  isLoading: boolean = false;
  constructor(private authService: AuthenticationService, private userService: UserService, private shipmentService: ShipmentService) {

  }

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    const token = await this.authService.getToken();

    this.authService.currentUser$.subscribe({
      next: (user: any) => {
        console.log(user);
        this.userService.getUserData(token, user.uid).subscribe({
          next: (userData: any) => {
            console.log(userData.id);
            this.shipmentService.getShipmentHistoryOfUser(token, userData.id).subscribe({
              next: (shipmentData: any) => {
                console.log(shipmentData);
                this.shipments = shipmentData;
                this.isLoading = false;
              },
              error: (error: any) => {
                console.log(error);
                this.isLoading = false;
              }
            })

          },
          error: (error: any) => {
            console.log(error);
            this.isLoading = false;
          },
        });
      },
      error: (error: any) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }
}
