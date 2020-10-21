import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { HttpClient, HttpRequest } from '@angular/common/http';
import 'rxjs/add/operator/withLatestFrom';
import { Store } from '@ngrx/store';

import * as RecipeActions from './recipe.actions';
import { Recipe } from '../recipe.model';
import * as fromRecipe from '../store/recipe.reducer';

@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipes = this.actions$
    .ofType(RecipeActions.FETCH_RECIPES)
    .switchMap((action: RecipeActions.FetchRecipes) => {
      // const token = this.authenticationService.getToken();
      return this.httpClient.get<Recipe[]>('https://recipe-shopping-book.firebaseio.com/recipes.json', {
        observe: 'body',
        responseType: 'json'
      });
    })
    .map(
      (recipes) => {
        // const recipes: Recipe[] = response.json();
        console.log('recipes', recipes);
        for (const recipe of recipes) {
          if (!recipe['ingredient']) {
            recipe['ingredient'] = [];
          }
        }
        return {
          type: RecipeActions.SET_RECIPES,
          payload: recipes
        };
      }
    );

    @Effect({dispatch: false})
    recipeStore = this.actions$
    .ofType(RecipeActions.STORE_RECIPES)
    .withLatestFrom(this.store.select('recipes'))
    .switchMap(([action, state]) => {
      const req = new HttpRequest('PUT', 'https://recipe-shopping-book.firebaseio.com/recipes.json', state.recipes, {reportProgress: true});
      return this.httpClient.request(req);
    });

  constructor(private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<fromRecipe.FeatureState>
    ) {}
}
