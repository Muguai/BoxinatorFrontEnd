import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Auth,getAuth, authState, createUserWithEmailAndPassword, getIdToken, signInWithEmailAndPassword, updateProfile, signInAnonymously } from '@angular/fire/auth';
import { from, switchMap, of  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser$ = authState(this.auth);

  async getToken(){
    const auth = getAuth()
    const { currentUser } = auth
    let token = "TOKEN NOT FOUND"
    if(currentUser != null){
        token = await getIdToken(currentUser, true)
    }
    return token
  }
    

  constructor(private auth: Auth) { }

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
          // Update the user's profile (including display name)
          return from(updateProfile(user, { displayName: name }));
        })
      );
  }
 
  logout(){
    return from(this.auth.signOut())
  }
 
}
