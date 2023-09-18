import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReadCountryDTO } from 'src/app/models/DTOs/Country/readCountryDTO';
import { Country } from 'src/app/models/country';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CountryService } from 'src/app/services/country/country.service';

@Component({
  selector: 'app-admin-countries',
  templateUrl: './admin-countries.component.html',
  styleUrls: ['./admin-countries.component.scss']
})
export class AdminCountriesComponent implements OnInit {
  scandinavia: Country = {id: 1, name: 'Scandinavia', rate: 5};
  countries: Country[] = [
    {id: 2, name: 'England', rate: 7},
    {id: 3, name: 'Japan', rate: 15},
    {id: 4, name: 'Canada', rate: 10}
  ];

  constructor(private readonly authService: AuthenticationService,
    private readonly countryService: CountryService) {}

  ngOnInit(): void {
    this.fetchCountries();
  }

  async fetchCountries(): Promise<void> {
    const token = await this.authService.getToken();
    this.countryService.getCountries(token).subscribe({
      next: (res: ReadCountryDTO[]) => {
        // this.countries = res;
        console.log(res)
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
