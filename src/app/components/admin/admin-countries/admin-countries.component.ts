import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Country } from 'src/app/models/country';

@Component({
  selector: 'app-admin-countries',
  templateUrl: './admin-countries.component.html',
  styleUrls: ['./admin-countries.component.scss']
})
export class AdminCountriesComponent {
  public scandinavia: Country = {id: 1, name: 'Scandinavia', rate: 5};
  public countries: Country[] = [
    {id: 2, name: 'England', rate: 7},
    {id: 3, name: 'Japan', rate: 15},
    {id: 4, name: 'Canada', rate: 10}
  ];

  public onSubmitScandinavia(form: NgForm) {
    console.log(form.value); // VALUE FOR PUT REQUEST
  }

  public onSubmit(form: NgForm) {
    console.log(form.value); // VALUE FOR PUT REQUEST
  }
}
