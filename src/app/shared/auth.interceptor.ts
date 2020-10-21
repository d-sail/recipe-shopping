import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Store } from '@ngrx/store';

import * as fromAppStore from '../store/app.reducers';
import * as fromAuth from '../authentication/store/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromAppStore.AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Interceptored!', req );
    // const copiedReq = req.clone({params: req.params.set('auth', this.authenticationService.getToken())});
    return this.store.select('auth')
    .take(1)
    .switchMap((authState: fromAuth.State) => {
      const copiedReq = req.clone({params: req.params.set('auth', authState.token)});
      return next.handle(copiedReq);
    });
  }
}
