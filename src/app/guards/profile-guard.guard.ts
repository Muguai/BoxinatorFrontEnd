import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { map, take } from 'rxjs/operators';

export const userProfileGuard: CanActivateFn = (route, state) => {
  const authService: AuthenticationService = inject(AuthenticationService);
  const router: Router = inject(Router);

  return authService.currentUser$.pipe(
    take(1), 
    map(user => {
      const isAnonymous = user && user.isAnonymous;
      if (isAnonymous) {
        console.log("User is anonymous");
        router.navigate(['']);
        return false;
      } else {
        console.log("User is not anonymous");
        return true;
      }
    })
  );
};
