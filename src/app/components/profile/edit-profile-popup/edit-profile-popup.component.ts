import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReadCountryDTO } from 'src/app/models/DTOs/Country/readCountryDTO';
import { ReadUserDTO } from 'src/app/models/DTOs/User/readUserDTO';
import {
  UpdateUserDTO,
  UserType,
} from 'src/app/models/DTOs/User/updateUserDTO';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CountryService } from 'src/app/services/country/country.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-edit-profile-popup',
  templateUrl: './edit-profile-popup.component.html',
  styleUrls: ['./edit-profile-popup.component.scss'],
})
export class EditProfilePopupComponent implements OnInit {
  currentUser: ReadUserDTO = {
    id: -1,
    uId: 'Loading.',
    name: 'Loading.',
    email: 'Loading.',
    shippingAddress: 'Loading.',
    billingAddress: 'Loading.',
    zipCode: 'Loading.',
    phoneNumber: 'Loading.',
    birthDate: new Date('1990-01-01'),
    countryId: null,
    isActive: 'Loading.',
    shipment: null,
  };
  currentUserUid?: string;
  countries?: ReadCountryDTO[];
  selectedCountryId: number | null = null;
  isLoading: boolean = true;
  loadingDots: string = '';
  startRandomDate: Date = new Date('1980-01-01');
  endRandomDate: Date = new Date('2000-12-31');

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private countryService: CountryService
  ) {}
  async ngOnInit(): Promise<void> {
    this.isLoading = true;

    const intervalId = setInterval(() => {
      this.loadingDots =
        this.loadingDots === '...' ? '' : this.loadingDots + '.';

        this.currentUser = {
          id: -1,
          uId: 'none',
          name: this.getRandomLetterString(10),
          email: this.getRandomLetterString(10) + "@" + this.getRandomLetterString(10) + "." + this.getRandomLetterString(3) ,
          shippingAddress: this.getRandomLetterString(30), 
          billingAddress: this.getRandomLetterString(30), 
          zipCode: this.getRandomNumberString(5), 
          phoneNumber: this.getRandomNumberString(10), 
          birthDate: this.getRandomDate(this.startRandomDate, this.endRandomDate),
          countryId: null,
          isActive: 'n/a',
          shipment: null,
        };
    }, 50);

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
            clearInterval(intervalId);
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

  getRandomDate(startDate: Date, endDate: Date): Date {
    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();
    const randomTimestamp =
      startTimestamp + Math.random() * (endTimestamp - startTimestamp);
    return new Date(randomTimestamp);
  }

  getRandomNumberString(length: number): string {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  getRandomLetterString(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  public async onSubmit(form: NgForm): Promise<void> {
    try {
      const token = await this.authService.getToken();
      if (!token) {
        console.log('Token not available');
        return;
      }

      console.log('Selected country id:', this.selectedCountryId);

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
