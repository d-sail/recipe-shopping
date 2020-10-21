import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from '../home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipes', loadChildren: '../recipes/recipes.module#RecipesModule' },
  { path: 'shopping-list', loadChildren: '../shopping-list/shopping.module#ShoppingModule' },
  // {path: 'signup', loadChildren: '../authentication/authentication.module#AuthenticationModule'},
  // {path: 'signin', loadChildren: '../authentication/authentication.module#AuthenticationModule'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})

export class AppRouteModule {

}
