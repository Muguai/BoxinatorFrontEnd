import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { CartService } from './services/cart-service/cart-serivce.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LoginTest';
  items: any[] = []; 
  cartOpen: boolean = false;
  cartAmount: number = 0;


  

  constructor(public authService: AuthenticationService, private router: Router, private cartService: CartService){
    this.cartService.cartAmountChange.subscribe((amount) => {
      this.setCartAmount(amount);
    });

    this.cartService.cartOpenChange.subscribe((change) => {
      this.onCartOpenChange(change);
    });

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

  isOnProfilePage() : boolean{
    return this.router.url.includes('/profile');
  }

  toggleCart() {
    this.cartService.toggleCart.emit();
    //this.cart.toggleSidebar();
  }

  onCartOpenChange(cartOpen: boolean) {
    this.cartOpen = cartOpen;
  }


  setCartAmount(cartAmount: number){
    this.cartAmount = cartAmount;
  }


  
}
