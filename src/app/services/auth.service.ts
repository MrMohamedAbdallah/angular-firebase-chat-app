import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase";
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class AuthService {

  // Is logged in indicators
  private isLogged: boolean = null;
  userStateSubject: Subject<boolean> = new Subject<boolean>();

  // User
  private user: any = null;

  constructor(private afAuth: AngularFireAuth, private router: Router) {

    // Subscribe to user status
    this.afAuth.authState.subscribe( user => {

      this.user = user;

      // Changing user state
      this.isLogged = user ? true : false;

      if(this.isLogged){
        this.router.navigate(['/chat']);
      }


      // Fire user state changes event
      this.userStateChanged();
    });


  }

  // Login with email and passowrd
  login(email: string, password: string) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(cred => {
        console.log("User logged in successfully");
        console.table(cred);
      })
      .catch(err => {
        console.error("User Faild to login");
        console.error(err);
      });
  }

  // Register with email and password
  register(email: string, password: string) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(cred => {
        console.log("User logged in successfully");
        console.table(cred);
      })
      .catch(err => {
        console.error("User Faild to login");
        console.error(err);
      });
  }

  // Login with Google
  loginWithGoogle() {
    // Passing Google provider to "loginWithProvider" method
    this.loginWithProvider(new auth.GoogleAuthProvider());
  }

  // Login with Github
  loginWithGithub() {
    // Passing Github provider to "loginWithProvider" method
    this.loginWithProvider(new auth.GithubAuthProvider());
  }

  // Login with provider
  private loginWithProvider(provider: auth.AuthProvider) {
    this.afAuth.auth
      .signInWithPopup(provider)
      .then(cred => {
        console.log("User logged in successfully");
        console.table(cred);
      })
      .catch(err => {
        console.error("User Faild to login");
        console.error(err);
      });
  }


  /**
   * Logout the authenticated user
   */
  logout(){
    this.afAuth.auth.signOut()
    .then( () => {
      console.log("User logout successfully");
      // Redirect the user to home page
      this.router.navigate(['/login']);
    })
    .catch( err => {
      console.log("User faild to logout");
      console.error(err);
    } );
  }
  

  /**
   * Fire an event when user state changing
   */
  private userStateChanged(){
    this.userStateSubject.next(this.isLogged);
  }

  /**
   * Getting user state
   */
  getUserState(){
    return this.isLogged;
  }

  /**
   * Getting user value
   */
  getUser(){
    return this.user;
  }


}
