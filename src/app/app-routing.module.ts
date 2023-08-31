import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import {  canActivate } from "@angular/fire/auth-guard";
import { userAnonymousGuard } from './guards/user-anonymous.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { AdminBoxesComponent } from './components/admin/admin-boxes/admin-boxes.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { AdminCountriesComponent } from './components/admin/admin-countries/admin-countries.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
    canActivate: [userAnonymousGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [userAnonymousGuard]
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
