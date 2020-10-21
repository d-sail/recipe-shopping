import { Router } from '@angular/router';
import { Injectable, OnInit } from '@angular/core';

import * as firebase from 'firebase';
import { Store } from '@ngrx/store';

import * as fromAppStore from '../store/app.reducers';
import * as AuthActions from '../authentication/store/auth.actions';


@Injectable()

export class AuthenticationService implements OnInit {

  token: string;

  constructor(private router: Router, private store: Store<fromAppStore.AppState>) {}

  ngOnInit() {}

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(
      user => {
        this.store.dispatch(new AuthActions.Signup());
        firebase.auth().currentUser.getToken().then(
          // (token: string) => this.token = token
          (token: string) => this.store.dispatch(new AuthActions.SetToken(token))
        );
      }
    )
    .catch(
      error => console.log(error)
    );
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(
      response => {
        this.store.dispatch(new AuthActions.Signin());
        this.router.navigate(['/']);
        firebase.auth().currentUser.getToken().then(
          // (token: string) => this.token = token
          (token: string) => this.store.dispatch(new AuthActions.SetToken(token))
        );
      }
    ).catch(
      error => console.log(error)
    );
  }

  getToken() {
    firebase.auth().currentUser.getToken().then(
      (token: string) => this.token = token
    );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  logOut() {
    firebase.auth().signOut();
    // this.token = null;
    // this.store.dispatch(new AuthActions.Logout());
  }
}
