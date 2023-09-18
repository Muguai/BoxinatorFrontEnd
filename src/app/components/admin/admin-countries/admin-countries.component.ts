import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReadCountryDTO } from 'src/app/models/DTOs/Country/readCountryDTO';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CountryService } from 'src/app/services/country/country.service';

@Component({
  selector: 'app-admin-countries',
  templateUrl: './admin-countries.component.html',
  styleUrls: ['./admin-countries.component.scss']
})
export class AdminCountriesComponent implements OnInit {
  scandinaviaShippingRate?: number;
  // countries excluding scandinavian countries
  countries: ReadCountryDTO[] = [];

  constructor(private readonly authService: AuthenticationService,
    private readonly countryService: CountryService) {}

  ngOnInit(): void {
    this.fetchScandinavia();
    this.fetchCountriesExcludingScandinavia();
  }

  private async fetchScandinavia(): Promise<void> {
    const token = await this.authService.getToken();
    this.countryService.getCountry(token, 1).subscribe({
      next: (res: ReadCountryDTO) => {
        this.scandinaviaShippingRate = res.shippingRate;
      },
      error: err => {
        console.error(err);
      }
    });
  }

  private async fetchCountriesExcludingScandinavia(): Promise<void> {
    const token = await this.authService.getToken();
    this.countryService.getCountriesExcludingScandinavia(token).subscribe({
      next: (res: ReadCountryDTO[]) => {
        this.countries = res;
      },
      error: err => {
        console.error(err);
      }
    });
  }

  onSubmitScandinavia(form: NgForm) {
    console.log(form.value); // VALUE FOR PUT REQUEST
  }

  onSubmit(form: NgForm) {
    console.log(form.value); // VALUE FOR PUT REQUEST
  }
}
