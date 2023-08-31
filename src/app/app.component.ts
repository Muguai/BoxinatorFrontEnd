import { Component, ViewChild } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LoginTest';
  items: any[] = []; 
  cartOpen: boolean = false;
  @ViewChild('cart') cart!: CartComponent;


  

  constructor(public authService: AuthenticationService, private router: Router, private activatedRoute: ActivatedRoute){

  }

  logout(){
      this.authService.logout().subscribe(() => {
        this.router.navigate(['']);
      });
  }

  isOnSignUpPage(): boolean {
    return this.router.url.includes('/signup');
  }

  isOnLoginPage(): boolean {
    return this.router.url.includes('/login');
  }

  isOnHomePage(): boolean {
    return this.router.url === '/';  
  }

  toggleCart() {
    this.cart.toggleSidebar();
  }

  onCartOpenChange(cartOpen: boolean) {
    console.log("gets here2");
    this.cartOpen = cartOpen;
  }

  
}
