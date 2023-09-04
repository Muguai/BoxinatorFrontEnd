import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Auth,getAuth, authState, createUserWithEmailAndPassword, getIdToken, signInWithEmailAndPassword, updateProfile, signInAnonymously } from '@angular/fire/auth';
import { from, switchMap, catchError, tap,  Observable, of  } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser$: Observable<any>;

  constructor(private auth: Auth) {
    this.currentUser$ = authState(this.auth);
    this.checkAndSignInAnonymously();
  }

  async getToken(){
    const auth = getAuth();
    const { currentUser } = auth;
    let token = "TOKEN NOT FOUND";
    if(currentUser != null){
      token = await getIdToken(currentUser, true);
    }
    return token;
  }
    

  login(username:string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  loginAnonymously() {
    return from(signInAnonymously(this.auth));
  }

  signup(name: string, email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password))
      .pipe(
        switchMap(({ user }) => {
          return from(updateProfile(user, { displayName: name }));
        })
      );
  }
 
  logout(){
    return from(this.auth.signOut())
  }

  private checkAndSignInAnonymously() {
    this.currentUser$.pipe(
      catchError(err => {
        console.error('Error checking authentication status:', err);
        return of(null); 
      }),
      tap(user => {
        if (!user) {
          console.log('User is not authenticated. Signing in anonymously...');
          this.loginAnonymously().subscribe({
            next: () => {
              console.log('User signed in anonymously.');
            },
            error: (error: any) => {
              console.log('Error signing in anonymously: ', error);
            },
          });  
        }else{
          console.log('User Exist');
        }
      })
    ).subscribe();
  }

 
}
