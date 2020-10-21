import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

import * as fromAppStore from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private store: Store<fromAppStore.AppState>) { }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    // this.authenticationService.signinUser(email, password);
    this.store.dispatch(new AuthActions.TrySignin({username: email, password: password}));
  }

}
