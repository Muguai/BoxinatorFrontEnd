import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})

export class LoginFormComponent {

  isLoading:boolean = false;
  public loginErrorMessage:string = "";

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private weatherService: WeatherService
  ) {}

  async formLogin(form: NgForm) {
    if (!form.valid) {
      return;
    }



    this.loginErrorMessage = "";

    console.log("gets here");

    const { email, password } = form.value;

    this.isLoading = true;


    console.log("email " + email + " password " + password)

    this.authService.login(email, password).subscribe({
        next: async () => {
          const token = await this.authService.getToken();

          this.isLoading = false;
          this.weatherService.addUser(token).subscribe({
            next: async (data : any) => {
              const token = await this.authService.getToken();

              this.weatherService.addUser(token).subscribe({
                next: (data : any) => {
                    console.log(data);
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
          this.router.navigate(['/'])
        },
        error: (error: any) => {
          console.log(error);
          switch(error.code){
            case "auth/user-not-found":
              this.loginErrorMessage = "User Not Found";
              break;
            case "auth/wrong-password":
              this.loginErrorMessage = "Wrong Password"
              break;
            default:
              this.loginErrorMessage = "Error Logging in";
              break;
          }
        },
      });
  }

  signUpRoute(){
    this.router.navigate(['/signup']);
  }
}
