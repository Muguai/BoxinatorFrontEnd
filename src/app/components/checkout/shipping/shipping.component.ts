import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReadCountryDTO } from 'src/app/models/DTOs/Country/readCountryDTO';
import { ReadUserDTO } from 'src/app/models/DTOs/User/readUserDTO';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';
import { CountryService } from 'src/app/services/country/country.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements AfterViewInit {
  countries: ReadCountryDTO[] = [];

  @ViewChild('shippingForm') shippingForm!: NgForm;

  // binding properties
  name: string = '';
  email: string = '';
  selectedCountry?: ReadCountryDTO;
  shippingAddress: string | null = null;
  billingAddress: string | null = null;
  zipCode: string | null = null;
  countryId: number = 0;
  instructions: string | null = null;
  giftMessage: string | null = null;

  constructor(private readonly authService: AuthenticationService,
    private readonly checkoutService: CheckoutService,
    private readonly userService: UserService,
    private readonly countryService: CountryService) {}

    ngAfterViewInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      if (!user.isAnonymous) {
        this.fetchUser(user.uid);
      }
      this.fetchCountries(null);
    });
  }

  private async fetchUser(id: string): Promise<void> {
    const token = await this.authService.getToken();
    this.userService.getUserData(token, id).subscribe({
      next: (res: ReadUserDTO) => {
        this.name = res.name;
        this.email = res.email;
        this.shippingAddress = res.shippingAddress;
        this.billingAddress = res.billingAddress;
        this.zipCode = res.zipCode;
        this.fetchCountries(res.countryId);
      },
      error: err => {
        console.error(err);
      }
    });
  }

  private async fetchCountries(savedUserCountryId?: number | null): Promise<void> {
    const token = await this.authService.getToken();
    this.countryService.getCountries(token).subscribe({
      next: (res: ReadCountryDTO[]) => {
        this.countries = res;
        if (savedUserCountryId) {
          // find matching country object
          this.selectedCountry = this.countries.find(c => c.id === savedUserCountryId);
          this.save();
          // auto populated form with all required fields still counts as invalid, so a check for inputs is made instead
          this.checkoutService.activateReviewPaymentTabs = this.checkoutService.checkInput(
            [this.name, this.email, this.shippingAddress, this.zipCode, this.countryId]
          );
        }
      },
      error: err => {
        console.error(err);
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
    const billingAddressValue = this.billingAddress === null || this.billingAddress === '' ? this.shippingAddress : this.billingAddress;

    const shippingDetails = {
      name: this.name,
      email: this.email,
      shippingAddress: this.shippingAddress,
      billingAddress: billingAddressValue,
      zipCode: this.zipCode,
      countryId: this.selectedCountry?.id || 0,
      countryName: this.selectedCountry?.name || '',
      countryRate: this.selectedCountry?.shippingRate || 0,
      instructions: instructionsValue,
      giftMessage: messageValue
    };
    
    this.checkoutService.shippingDetails = shippingDetails;
    this.checkoutService.shippingDetailsChange.emit();
  }
}
