import { Injectable } from '../../../node_modules/@angular/core';
import { Http, Response } from '../../../node_modules/@angular/http';
// import 'rxjs';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthenticationService } from '../services/authentication.service';


@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private authenticationService: AuthenticationService) { }

  storeRecipes() {
    const token = this.authenticationService.getToken();
    return this.httpClient.put('https://recipe-shopping-book.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
  }

  getRecipes() {
    const token = this.authenticationService.getToken();
    this.httpClient.get<Recipe[]>('https://recipe-shopping-book.firebaseio.com/recipes.json?auth=' + token)
    .map(
      (recipes) => {
        // const recipes: Recipe[] = response.json();
        for (const recipe of recipes) {
          if (!recipe['ingredient']) {
            recipe['ingredient'] = [];
          }
        }
        return recipes;
      }
    )
    .subscribe(
      (recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      }
    );
  }
}
