import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

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
    private userService: UserService
  ) {}

  signUpRoute() {}

  async addUser() {
    const token = await this.authService.getToken();
    this.userService.postUserToDb(token).subscribe({
      next: (response : any) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

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
          this.addUser();
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
