import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  @ViewChild('shippingForm') shippingForm!: NgForm;

  // binding properties
  name: string = '';
  mail: string = '';
  selectedCountry?: Country;
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
        // find matching country object
        this.selectedCountry = this.countries.find(c => c.id === 5);

        this.save();
        // auto populated form counts as invalid, so manually set
        this.checkoutService.activateReviewPaymentTabs = true;
      }
    });
  }

  inputChange(): void {
    this.save();
    // toggle Review and Payment tabs activation
    this.checkoutService.activateReviewPaymentTabs = this.shippingForm.valid!;
  }

  // save input values
  private save(): void {
    const messageValue = this.giftMessage === '' ? null : this.giftMessage;
    const instructionsValue = this.instructions === '' ? null : this.instructions;
    const billingAddressValue = this.billingAddress === '' ? this.shippingAddress : this.billingAddress;

    const shippingDetails = {
      name: this.name,
      mail: this.mail,
      shippingAddress: this.shippingAddress,
      billingAddress: billingAddressValue,
      zipCode: this.zipCode,
      countryId: this.selectedCountry?.id || 0,
      countryName: this.selectedCountry?.name || '',
      countryRate: this.selectedCountry?.rate || 0,
      instructions: instructionsValue,
      giftMessage: messageValue
    };
    
    this.checkoutService.shippingDetails = shippingDetails;
    this.checkoutService.shippingDetailsChange.emit();
  }
}
