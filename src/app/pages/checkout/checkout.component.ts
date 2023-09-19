import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateShipmentDTO,BoxInfo } from 'src/app/models/DTOs/Shipment/createShipmentDTO';
import { Box } from 'src/app/models/mysteryBox';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';
import { ShipmentService } from 'src/app/services/shipment-service/shipment.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  boxes: Box[] = [];
  isLoading: boolean = false;
  isError: boolean = false;


  constructor(
    readonly checkoutService: CheckoutService,
    private userService: UserService,
    private authService: AuthenticationService,
    private router: Router,
    private shipmentService: ShipmentService
  ) {}

  ngOnInit(): void {
    const savedCart = sessionStorage.getItem('cartData');
    if (savedCart) {
      const savedCartData = JSON.parse(savedCart);
      this.boxes = savedCartData.boxes;
    }
  }

  async placeOrder() {
    console.log(this.checkoutService.shippingDetails);
    const details = this.checkoutService.shippingDetails;
    console.log(this.boxes);
    this.isLoading = true;
    this.isError = false;

    const token = await this.authService.getToken();

    this.authService.currentUser$.subscribe({
      next: (user: any) => {
        this.userService.getUserData(token, user.uid).subscribe({
          next: (userData: any) => {
            const userId = userData.id;

            const shipmentDTO: CreateShipmentDTO = {
              email: details.email,
              shippingAddress: details.shippingAddress,
              billingAddress: details.billingAddress,
              zipCode: details.zipCode,
              instructions: details.instructions,
              giftMessage: details.giftMessage,
              userId: userId,
              countryId: details.countryId,
              BoxShipments: this.boxes.map((box) => ({
                boxId: box.id,
                quantity: box.amount, 
              })),
            };

            console.log("BOx list ", shipmentDTO);
    
            this.handleOrder(shipmentDTO, token);
          },
          error: (error: any) => {
            console.log(error);
            this.isLoading = false;
            this.isError = true;
          }
        }
        );
      },
      error: (error: any) => {
        console.log(error);
        this.isLoading = false;
        this.isError = true;

      },
    });
  }

  async handleOrder(
    shipmentDTO: CreateShipmentDTO,
    token: string
  ): Promise<void> {

    console.log(shipmentDTO);
    console.log("gets here");

    this.shipmentService.postShipment(token, shipmentDTO).subscribe({
      next: (response: any) => {
        console.log(response);
        this.router.navigateByUrl('/');
        this.isLoading = false;
        this.isError = false;
      },
      error: (error: any) => {
        console.log(error);
        this.isLoading = false;
        this.isError = true;
      }
    }
    );
  }
}
