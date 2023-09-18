import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReadCountryDTO } from 'src/app/models/DTOs/Country/readCountryDTO';
import { UpdateCountryDTO } from 'src/app/models/DTOs/Country/updateCountryDTO';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CountryService } from 'src/app/services/country/country.service';

@Component({
  selector: 'app-admin-countries',
  templateUrl: './admin-countries.component.html',
  styleUrls: ['./admin-countries.component.scss']
})
export class AdminCountriesComponent implements OnInit {
  scandinavia?: ReadCountryDTO;
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
        this.scandinavia = res;
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

  async onSubmitScandinavia(form: NgForm) {
    this.scandinavia!.shippingRate = form.value.shippingRate;
    const scandinaviaCopy = {...this.scandinavia!};
    // convert from ReadCountryDTO to UpdateCountryDTO
    const uDTO = ((rDTO: ReadCountryDTO) => {
      delete (rDTO as any).users;
      delete (rDTO as any).shipments;
      return rDTO as UpdateCountryDTO;
    })(scandinaviaCopy);

    const token = await this.authService.getToken();
    this.countryService.putScandinavia(token, uDTO).subscribe({
      error: err => {
        console.error(err);
      }
    });
  }

  async onSubmit(form: NgForm) {
    form.value.country.shippingRate = form.value.shippingRate;
    const countryCopy = {...form.value.country};
    // convert from ReadCountryDTO to UpdateCountryDTO
    const uDTO = ((rDTO: ReadCountryDTO) => {
      delete (rDTO as any).users;
      delete (rDTO as any).shipments;
      return rDTO as UpdateCountryDTO;
    })(countryCopy);

    const token = await this.authService.getToken();
    this.countryService.putCountry(token, form.value.country.id, uDTO).subscribe({
      error: err => {
        console.error(err);
      }
    });
  }
}
