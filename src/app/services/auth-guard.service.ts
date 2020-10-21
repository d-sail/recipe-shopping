import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromAppStore from '../store/app.reducers';
import * as fromAuth from '../authentication/store/auth.reducers';

@Injectable()

export class AuthGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService,
              private store: Store<fromAppStore.AppState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return this.authenticationService.isAuthenticated();
    return this.store.select('auth')
    .map((authState: fromAuth.State) => {
      return authState.authenticated;
    });
  }
}
