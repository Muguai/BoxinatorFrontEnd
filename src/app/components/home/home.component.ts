import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  user$ = this.authService.currentUser$;

  constructor(private authService: AuthenticationService) {
    console.log(authService.getToken());
  }

}
