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
import { CartComponent } from './components/landing/cart/cart.component';
import { MatSidenav, MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { AdminBoxesComponent } from './components/admin/admin-boxes/admin-boxes.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { AdminCountriesComponent } from './components/admin/admin-countries/admin-countries.component';
import { LoginPage } from './pages/login/login.page';
import { SignUpPage } from './pages/sign-up/sign-up.page';
import { LandingPage } from './pages/landing/landing.page';
import { BoxListComponent } from './components/landing/box-list/box-list.component';
import { CartItemComponent } from './components/landing/cart-item/cart-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BoxItemComponent } from './components/landing/box-item/box-item.component';
import { LandingHeaderComponent } from './components/landing/landing-header/landing-header.component';
import { LogoComponent } from './components/logo/logo.component';
import { OrderReviewComponent } from './components/order-review/order-review.component';
import { OrderReviewPopupComponent } from './components/admin/order-review-popup/order-review-popup.component';
import { EditBoxPopupComponent } from './components/admin/edit-box-popup/edit-box-popup.component';
import { ProfilePage } from './pages/profile/profile.page';
import { ShipmentHistoryComponent } from './components/profile/shipment-history/shipment-history.component';
import { ProfileInfoComponent } from './components/profile/profile-info/profile-info.component';
import { ClaimPackageComponent } from './components/profile/claim-package/claim-package.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { SummaryComponent } from './components/checkout/summary/summary.component';
import { SummaryItemComponent } from './components/checkout/summary-item/summary-item.component';

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
    LandingHeaderComponent,
    LogoComponent,
    BoxItemComponent,
    OrderReviewComponent,
    OrderReviewPopupComponent,
    EditBoxPopupComponent,
    ProfilePage,
    ShipmentHistoryComponent,
    ProfileInfoComponent,
    ClaimPackageComponent,
    CheckoutComponent,
    SummaryComponent,
    SummaryItemComponent
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
    MatSelectModule,
    NgbModule,
    MatDialogModule,
    MatCardModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }