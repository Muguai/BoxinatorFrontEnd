import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent {

  isLoading:boolean = false;
  public signUpErrorMessage:string = "";


  constructor(
    private authService: AuthenticationService,
    private toast: HotToastService,
    private router: Router, 
    private weatherService: WeatherService
  ) {}

  signUpRoute() {}

  async formSignUp(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const { name, email, password, passwordVal } = form.value;

    if (password !== passwordVal) {
      console.log('Password dont match');
      return;
    }



    console.log("Name " + name, " email " + email + " password " + password + " valPassword " + passwordVal);

    this.authService
      .signup(name, email, password)
      .subscribe({
        next: async () => {
          this.isLoading = false;
          this.router.navigate(['/'])
        },
        error: (error: any) => {
          console.log(error);
          switch(error.code){
              case "auth/email-already-in-use":
                this.signUpErrorMessage = "Email already in use";
                break;
              default:
                this.signUpErrorMessage = "Error signing up";
                break;
          }
        },
      });

  }
}
