import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromAppStore from '../store/app.reducers';
import * as fromAuth from '../authentication/store/auth.reducers';
import * as AuthActions from '../authentication/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;
constructor(private store: Store<fromAppStore.AppState>) {}

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSaveData() {
    // this.dataStorageService.storeRecipes()
    //   .subscribe(
    //     (response: Response) => {
    //       console.log(response);
    //     });
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetchData() {
    // this.dataStorageService.getRecipes();
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogout() {
    // this.authenticationService.logOut();
    this.store.dispatch(new AuthActions.Logout());
  }

// @Output() featureSelected = new EventEmitter<string>();
//   onSelect(feature: string) {
//     // console.log('feature', feature);
//     this.featureSelected.emit(feature);
//   }
}
