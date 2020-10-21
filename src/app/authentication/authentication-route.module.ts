import { NgModule } from '../../../node_modules/@angular/core';
import { Routes, RouterModule } from '../../../node_modules/@angular/router';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

const authenticationRoutes: Routes = [
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
];

@NgModule({
imports: [RouterModule.forChild(authenticationRoutes)],
exports: [RouterModule]
})

export class AuthenticationRouteModule {}
