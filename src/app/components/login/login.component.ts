import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent {

  isLoading:boolean = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  async formLogin(form: NgForm) {
    if (!form.valid) {
      return;
    }
    

    console.log("gets here");

    const { email, password } = form.value;
    this.isLoading = true;
    console.log("email " + email + " password " + password)
    this.authService.login(email, password).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/home'])
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }

  signUpRoute(){
    this.router.navigate(['/signup']);
  }
}
