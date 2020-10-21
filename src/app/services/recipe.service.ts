import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shoppingList.service';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';

@Injectable()

export class RecipeService {
  // recipeSelected = new EventEmitter<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

 private recipes: Recipe[] = [
    new Recipe('Chiken Hundi',
               'Need boild chikan',
               '../assets/recipe-1.jpg',
               [
                 new Ingredient('Chekan', 1),
                 new Ingredient('Garam Masala', 1)
               ]),

    new Recipe('Matton Ran',
               'Need tender lagpice of lamp',
               '../assets/recipe-2.jpg',
               [
                 new Ingredient('Matton', 1),
                 new Ingredient('Masala', 2)
               ])
  ];

  constructor(private shoppingListService: ShoppingListService, private store: Store<{shoppingList: { ingredients: Ingredient[]}}>) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  // getRecipe(index: number) {
  //   return this.recipes[index];
  // }

  addIngToShoppingLi(ingredients: Ingredient[]) {
    // this.shoppingListService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  // addRecipe(recipe: Recipe) {
  //   this.recipes.push(recipe);
  //   this.recipesChanged.next(this.recipes.slice());
  // }

  // updateRecipe(index: number, newRecipe: Recipe ) {
  //   this.recipes[index] = newRecipe;
  //   this.recipesChanged.next(this.recipes.slice());
  // }

  // deleteRecipe(index: number) {
  //   this.recipes.splice(index, 1);
  //   this.recipesChanged.next(this.recipes.slice());
  // }

}
