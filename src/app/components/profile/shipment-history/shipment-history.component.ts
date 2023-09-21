import { Component, OnInit } from '@angular/core';
import { ReadCountryDTO } from 'src/app/models/DTOs/Country/readCountryDTO';
import { dummyBoxes, Box } from 'src/app/models/mysteryBox';
import dummyShipments, { Shipment  } from 'src/app/models/shipment';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CountryService } from 'src/app/services/country/country.service';
import { ShipmentService } from 'src/app/services/shipment-service/shipment.service';
import { UserService } from 'src/app/services/user/user.service';
@Component({
  selector: 'app-shipment-history',
  templateUrl: './shipment-history.component.html',
  styleUrls: ['./shipment-history.component.scss']
})
export class ShipmentHistoryComponent implements OnInit {

  shipments: Shipment[] = [];
  countries: ReadCountryDTO[] = [];

  isLoading: boolean = false;
  constructor(private countryService:CountryService,private authService: AuthenticationService, private userService: UserService, private shipmentService: ShipmentService) {

  }

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    const token = await this.authService.getToken();
    this.countryService.getCountries(token).subscribe({
      next: (countries: any) => {
        console.log(countries);
        this.countries = countries;
        this.addHistoryItem(token);
      },
      error: (error: any) => {
        console.log(error);
      },
    });

  
  }

  async addHistoryItem(token: string){
    this.authService.currentUser$.subscribe({
      next: (user: any) => {
        console.log(user);
        this.shipmentService.getShipmentHistoryOfUser(token, user.uid).subscribe({
          next: (shipmentData: any) => {
            console.log(shipmentData);


             // Map the received data to the Shipment model
             this.shipments = shipmentData.map((shipment: any) => {
              const mappedShipment: Shipment = {
                id: shipment.id,
                name: shipment.name,
                date: shipment.created,
                shippingAddress: shipment.shippingAddress,
                billingAddress: shipment.billingAddress,
                mail: shipment.email,
                zipCode: shipment.zipCode,
                country: this.countries[shipment.countryId - 1].name,
                instructions: shipment.instructions,
                giftMessage: shipment.giftMessage,
                rate: this.countries[shipment.countryId - 1].shippingRate, 
                cost: shipment.totalCost,
                status: shipment.status,
                content: shipment.boxShipments.map((boxShipment: any) => {
                  const box: Box = boxShipment.box; // Declare box here
                  box.amount = boxShipment.quantity;
                  return box;
                }),
              };
              return mappedShipment;
            });
            
            this.isLoading = false;
          },
          error: (error: any) => {
            console.log(error);
            this.isLoading = false;
          }
        });
      },
      error: (error: any) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }
}
