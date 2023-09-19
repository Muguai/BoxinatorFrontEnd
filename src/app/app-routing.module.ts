import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  canActivate } from "@angular/fire/auth-guard";
import { userAnonymousGuard } from './guards/user-anonymous.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { AdminBoxesComponent } from './components/admin/admin-boxes/admin-boxes.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { AdminCountriesComponent } from './components/admin/admin-countries/admin-countries.component';
import { LandingPage } from './pages/landing/landing.page';
import { SignUpPage } from './pages/sign-up/sign-up.page';
import { LoginPage } from './pages/login/login.page';
import { ProfilePage } from './pages/profile/profile.page';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPage,
  },
  {
    path: 'signup',
    component: SignUpPage,
    canActivate: [userAnonymousGuard]
  },
  {
    path: 'login',
    component: LoginPage,
    canActivate: [userAnonymousGuard]
  },
  {
    path: 'profile',
    component: ProfilePage
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'orders'},
      {path: 'orders', component: AdminOrdersComponent},
      {path: 'boxes', component: AdminBoxesComponent},
      {path: 'users', component: AdminUsersComponent},
      {path: 'countries', component: AdminCountriesComponent}
    ],
    canActivate: [adminGuard]
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
