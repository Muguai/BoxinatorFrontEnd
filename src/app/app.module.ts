import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HotToastModule } from '@ngneat/hot-toast';
import { MatMenuItem, MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { TestAuthenticationWeatherComponent } from './components/test-authentication-weather/test-authentication-weather.component';
import { CartComponent } from './components/cart/cart.component';
import { MatSidenav, MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { AdminBoxesComponent } from './components/admin/admin-boxes/admin-boxes.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { AdminCountriesComponent } from './components/admin/admin-countries/admin-countries.component';
import { LoginPage } from './pages/login/login.page';
import { SignUpPage } from './pages/sign-up/sign-up.page';
import { LandingPage } from './pages/landing/landing.page';
import { BoxListComponent } from './components/box-list/box-list.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { LogoComponent } from './components/logo/logo.component';
import { AdminOrdersStatusComponent } from './components/admin/admin-orders-status/admin-orders-status.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpFormComponent,
    LoginFormComponent,
    HomeComponent,
    TestAuthenticationWeatherComponent,
    CartComponent,
    AdminComponent,
    AdminOrdersComponent,
    AdminBoxesComponent,
    AdminUsersComponent,
    AdminCountriesComponent,
    LoginPage,
    SignUpPage,
    LandingPage,
    BoxListComponent,
    CartItemComponent,
    LogoComponent,
    AdminOrdersStatusComponent,
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    HotToastModule.forRoot(),
    MatMenuModule,
    HttpClientModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
