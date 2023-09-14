import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReadCountryDTO } from 'src/app/models/readCountryDTO';
import { ReadUserDTO } from 'src/app/models/readUserDTO';
import { UpdateUserDTO, UserType } from 'src/app/models/updateUserDTO';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CountryService } from 'src/app/services/country.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile-popup',
  templateUrl: './edit-profile-popup.component.html',
  styleUrls: ['./edit-profile-popup.component.scss']
})
export class EditProfilePopupComponent implements OnInit {

  currentUser: ReadUserDTO  = {
    id: -1,
    uId: "Loading...",
    name: "Loading...",
    email: "Loading...",
    shippingAddress: "Loading...",
    billingAddress: "Loading...",
    zipCode: "Loading...",
    phoneNumber: "Loading...",
    birthDate: new Date("1990-01-01"),
    countryId: null,
    isActive: "Loading...",
    shipment: null,
  };
  currentUserUid?: string;
  countries?: ReadCountryDTO[];
  selectedCountryId: number | null = null;
  isLoading: boolean = true;

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private countryService: CountryService
  ) {
    
    
  }
  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    const token = await this.authService.getToken();
    this.countryService.getCountries(token).subscribe({
      next: (countries: any) => {
        console.log(countries);
        this.countries = countries;
      },
      error: (error: any) => {
        console.log(error);
      },
    });

    this.authService.currentUser$.subscribe({
      next: (user: any) => {
        console.log(user);
        this.userService.getUserData(token, user.uid).subscribe({
          next: (userData: any) => {
            console.log(userData.id);
            this.currentUser = userData;
            this.currentUserUid = user.uid;
            this.isLoading = false;
          },
          error: (error: any) => {
            console.log(error);
          },
        });
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  public async onSubmit(form: NgForm): Promise<void> {
    try {
      const token = await this.authService.getToken();
      if (!token) {
        console.log("Token not available");
        return;
      }

      console.log("Selected country id:", this.selectedCountryId);

      const updatedUser: UpdateUserDTO = {
        id: this.currentUser!.id,
        uId: this.currentUserUid!,
        name: this.currentUser!.name,
        email: this.currentUser!.email,
        shippingAddress: this.currentUser!.shippingAddress,
        billingAddress: this.currentUser!.billingAddress,
        zipCode: this.currentUser!.zipCode,
        phoneNumber: this.currentUser!.phoneNumber,
        birthDate: this.currentUser!.birthDate,
        userType: UserType.User,
        isActive: this.currentUser!.isActive,
        countryId: this.selectedCountryId || null,
      };

      console.log('Form Values:', form.value); // Log form values for debugging
      console.log('Updated User:', updatedUser); // Log the updated user object

      this.userService.putUser(token, updatedUser.id, updatedUser).subscribe({
        next: (response: any) => {
          console.log('Update Response:', response);
          // Handle the success response here
        },
        error: (error: any) => {
          console.error('Update Error:', error);
          // Handle the error here
        },
      });
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle the error here
    }
  }
}
