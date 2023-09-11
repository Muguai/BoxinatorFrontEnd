import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-edit-profile-popup',
  templateUrl: './edit-profile-popup.component.html',
  styleUrls: ['./edit-profile-popup.component.scss']
})
export class EditProfilePopupComponent {

  countries: string[] = ['Country 1', 'Country 2', 'Country 3'];
  selectedCountry: string = 'N/A';

  public onSubmit(form: NgForm): void {
    console.log(form.value); // VALUES FOR PUT REQUEST
  }
}
