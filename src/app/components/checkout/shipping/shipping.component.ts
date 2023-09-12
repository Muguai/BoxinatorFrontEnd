import { Component } from '@angular/core';
import { Country } from 'src/app/models/country';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent {
  public id?: number;
  public user?: User;
  public selectedCountry?: number;
  public countries: Country[] = [
    {id: 1, name: 'Norway', rate: 5},
    {id: 2, name: 'England', rate: 7},
    {id: 3, name: 'Japan', rate: 15},
    {id: 4, name: 'Canada', rate: 10},
    {id: 5, name: 'Sweden', rate: 5}
  ];

  constructor(private readonly authService: AuthenticationService) {
    authService.currentUser$.subscribe((user) => {
      // ADD API CALL TO GET THE DATA BELOW
      if (!user.isAnonymous) {
        this.user = {
          name: 'John Doe',
          shippingAddress: 'Some address',
          billingAddress: 'Some address',
          mail: 'john.doe@mail.com',
          zipCode: '12345',
          countryId: 5
        }
        this.selectedCountry = this.user.countryId;
      }
    })
  }
}
