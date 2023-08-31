import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  canActivate } from "@angular/fire/auth-guard";
import { userAnonymousGuard } from './guards/user-anonymous.guard';
import { LandingPage } from './pages/landing/landing.page';
import { SignUpPage } from './pages/sign-up/sign-up.page';
import { LoginPage } from './pages/login/login.page';

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
  }
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
