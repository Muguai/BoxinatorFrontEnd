import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  constructor(
    private authService: AuthenticationService,
    private toast: HotToastService,
    private router: Router
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
      .pipe(
        this.toast.observe({
          success: 'Your all signed up :D',
          loading: 'Signing in...',
          error: (err) => `${err?.message}`,
        })
      )
      .subscribe(() => {
        this.router.navigate(['/home'])
      });

  }
}
