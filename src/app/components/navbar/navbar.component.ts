import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CartService } from 'src/app/services/cart-service/cart-serivce.service';
import { UserService } from 'src/app/services/user/user.service';
import { map, switchMap } from 'rxjs/operators';
import { from, catchError, of } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  title = 'LoginTest';
  items: any[] = []; 
  cartOpen: boolean = false;
  cartAmount: number = 0;
  isAdmin: boolean = false;
  

  constructor(private userService: UserService ,public authService: AuthenticationService, private router: Router, private cartService: CartService){

    this.cartService.cartAmountChange.subscribe((amount) => {
      this.setCartAmount(amount);
    });

    this.cartService.cartOpenChange.subscribe((change) => {
      this.onCartOpenChange(change);
    });

  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe({
      next: async user => {
        const token = await this.authService.getToken();
        if (!user.isAnonymous) {
          this.userService.getUserData(token, user.uid).subscribe({
            next: userData => {
              if (userData.userType === 'Admin') {
                this.isAdmin = true;
              }
            },
            error: err => {
              console.error(err);
            }
          });
        }
      },
      error: err => {
        console.error(err);
      }
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
