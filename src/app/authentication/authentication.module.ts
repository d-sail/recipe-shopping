import { NgModule } from '../../../node_modules/@angular/core';
import { CommonModule } from '../../../node_modules/@angular/common';
import { FormsModule } from '../../../node_modules/@angular/forms';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AuthenticationRouteModule } from './authentication-route.module';

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthenticationRouteModule
  ]
})
export class AuthenticationModule {}
