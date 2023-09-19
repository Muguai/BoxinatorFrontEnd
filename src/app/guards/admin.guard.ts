import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from '../services/user/user.service';
import { from, catchError, of } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService: AuthenticationService = inject(AuthenticationService);
  const userService: UserService = inject(UserService);
  const router: Router = inject(Router);

  return from(authService.getToken()).pipe(
    switchMap(token => authService.currentUser$.pipe(
      switchMap(user => userService.getUserData(token, user.uid).pipe(
        map(userData => {
          if (userData.userType === 'Admin') {
            return true;
          }
          router.navigate(['']);
          return false;
        }),
        catchError(() => {
          // occurs e.g. userService.getUserData(token, user.uid) --> 404
          router.navigate(['']);
          return of(false);
        })
      ))
    ))
  );
};