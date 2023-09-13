import { Component } from '@angular/core';
import { Country } from 'src/app/models/country';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent {
  countries: Country[] = [
    {id: 1, name: 'Norway', rate: 5},
    {id: 2, name: 'England', rate: 7},
    {id: 3, name: 'Japan', rate: 15},
    {id: 4, name: 'Canada', rate: 10},
    {id: 5, name: 'Sweden', rate: 5}
  ];

  // binding properties
  name: string = '';
  mail: string = '';
  selectedCountryId?: number;
  shippingAddress: string = '';
  billingAddress: string = '';
  zipCode: string = '';
  countryId: number = 0;
  instructions: string | null = null;
  giftMessage: string | null = null;

  constructor(private readonly authService: AuthenticationService,
    private readonly checkoutService: CheckoutService) {
    authService.currentUser$.subscribe((user) => {
      // ADD API CALL TO GET THE DATA BELOW
      if (!user.isAnonymous) {
        this.name = 'John Doe',
        this.mail = 'john.doe@mail.com',
        this.shippingAddress = 'Some address',
        this.billingAddress = 'Some address',
        this.zipCode = '12345',
        this.countryId = 5
        
        this.selectedCountryId = this.countryId;
      }
    });
  }

  save(country?: any): void {
    const messageValue = this.giftMessage === '' ? null : this.giftMessage;
    const instructionsValue = this.instructions === '' ? null : this.instructions;
    const billingAddressValue = this.billingAddress === '' ? this.shippingAddress : this.billingAddress;

    const shippingDetails = {
      name: this.name,
      mail: this.mail,
      shippingAddress: this.shippingAddress,
      billingAddress: billingAddressValue,
      zipCode: this.zipCode,
      countryId: country?.id || 0,
      countryName: country?.name || '',
      countryRate: country?.rate || 0,
      instructions: instructionsValue,
      giftMessage: messageValue
    };
    
    this.checkoutService.shippingDetailsChange.emit(shippingDetails);
  }
}
