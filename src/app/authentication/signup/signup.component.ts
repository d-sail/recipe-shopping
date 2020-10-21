import { Component, OnInit } from '@angular/core';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { Store } from '@ngrx/store';

import { AuthenticationService } from '../../services/authentication.service';

import * as fromAppStore from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private store: Store<fromAppStore.AppState>) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    // this.authenticationService.signupUser(email, password);
    this.store.dispatch(new AuthActions.TrySignup({username: email, password: password}));
  }
}
