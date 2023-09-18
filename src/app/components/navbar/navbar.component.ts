import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CartService } from 'src/app/services/cart-service/cart-serivce.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
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
