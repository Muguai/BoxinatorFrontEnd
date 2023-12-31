import { Component, Input, OnInit } from '@angular/core';
import { ReadBoxDTO } from 'src/app/models/DTOs/Box/readBoxDTO';
import { ReadCountryDTO } from 'src/app/models/DTOs/Country/readCountryDTO';
import { ReadShipmentDTO } from 'src/app/models/DTOs/Shipment/readShipmentDTO';
import { ReadUserDTO } from 'src/app/models/DTOs/User/readUserDTO';
import { Box } from 'src/app/models/mysteryBox';
import { OrderContent } from 'src/app/models/orderContent';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { BoxServiceService } from 'src/app/services/box-service/box-service.service';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';
import { CountryService } from 'src/app/services/country/country.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.scss']
})
export class OrderReviewComponent implements OnInit {
  // potential input from order-review-popup component
  @Input() shipment?: ReadShipmentDTO; // USE FOR FUTURE API CALL
  // potential input from checkout component
  @Input() boxes?: Box[];

  name: string = 'Loading...';
  email?: string;
  shippingAddress?: string;
  billingAddress?: string;
  zipCode?: string;
  country: string = 'Loading...';
  instructions?: string | null;
  giftMessage?: string | null;
  orderCost: number = 0;
  totalCost: number = 0;
  shippingRate: number = 0;
  orderContent: OrderContent[] = [];

  constructor(private readonly checkoutService: CheckoutService,
    private readonly authService: AuthenticationService,
    private readonly userService: UserService, 
    private readonly countryService: CountryService,
    private readonly boxService: BoxServiceService) {}

  ngOnInit(): void {
    if (this.shipment) {
      this.fetchUser(this.shipment.userId);
      this.fetchCountry(this.shipment.countryId);
      this.fetchBoxes(this.shipment.id);
      this.admin();
    } else if (this.boxes) {
      this.checkout();
    }
  }

  private async admin() {
    this.email = this.shipment!.email;
    this.shippingAddress = this.shipment!.shippingAddress;
    this.billingAddress = this.shipment!.billingAddress;
    this.zipCode = this.shipment!.zipCode;
    this.instructions = this.shipment!.instructions;
    this.giftMessage = this.shipment!.giftMessage;
  }

  private async fetchUser(id: number): Promise<void> {
    const token = await this.authService.getToken();
    this.userService.getUser(token, id).subscribe({
      next: (res: ReadUserDTO) => {
        this.name = res.name;
      },
      error: err => {
        console.error(err);
      }
    });
  }

  private async fetchCountry(id: number): Promise<void> {
    const token = await this.authService.getToken();
    this.countryService.getCountry(token, id).subscribe({
      next: (res: ReadCountryDTO) => {
        this.country = res.name;
        this.shippingRate = res.shippingRate;
        this.totalCost = res.shippingRate;
      },
      error: err => {
        console.error(err);
      }
    });
  }

  private async fetchBoxes(id: number): Promise<void> {
    const token = await this.authService.getToken();
    this.boxService.getShipmentBoxes(token, id).subscribe({
      next: async res => {
        for (const box of res) {
          this.boxService.getBoxById(token, box.boxId).subscribe({
            next: boxData => {
              let orderBox: OrderContent = {
                boxName: boxData.boxName,
                quantity: box.quantity
              }
              this.orderContent.push(orderBox);
              this.totalCost += boxData.price*box.quantity;
              this.orderCost! += boxData.price*box.quantity;
            }
          });
        }
      },
      error: err => {
        console.error(err);
      }
    });
  }

  private checkout() {
    this.checkoutService.shippingDetailsChange.subscribe(() => {
      const shippingDetailsData = this.checkoutService?.shippingDetails;

      this.name = shippingDetailsData.name;
      this.email = shippingDetailsData.email;
      this.shippingAddress = shippingDetailsData.shippingAddress;
      this.billingAddress = shippingDetailsData.billingAddress;
      this.zipCode = shippingDetailsData.zipCode;
      this.country = shippingDetailsData.countryName;
      this.instructions = shippingDetailsData.instructions;
      this.giftMessage = shippingDetailsData.giftMessage;
      this.shippingRate = shippingDetailsData.countryRate;

      // calc total price for order
      let orderSum: number = 0;
      for (const box of this.boxes!) {
        orderSum += box.price * box.amount;
      }
      // round to two decimals
      orderSum = Number(orderSum.toFixed(2));
      this.orderCost = orderSum;
      this.totalCost = orderSum + shippingDetailsData?.countryRate;

      this.orderContent = [];
      for (const box of this.boxes!) {
        let orderBox: OrderContent = {
          boxName: box.boxName,
          quantity: box.amount
        }
        this.orderContent.push(orderBox);
      }
    });
  }
}
