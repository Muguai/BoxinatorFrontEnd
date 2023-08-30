import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import {  canActivate } from "@angular/fire/auth-guard";
import { userAnonymousGuard } from './guards/user-anonymous.guard';

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
  }
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
