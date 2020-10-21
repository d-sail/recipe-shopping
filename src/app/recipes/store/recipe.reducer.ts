import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as RecipeActions from './recipe.actions';

export interface FeatureState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
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
  ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
  switch (action.type) {
    case (RecipeActions.SET_RECIPES):
      return {
        ...state,
        recipes: [...action.payload]
      };
    case (RecipeActions.ADD_RECIPE):
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case (RecipeActions.UPDATE_RECIPE):
      const recipe = state.recipes[action.payload.index];
      const updateRecipe = {
        ...recipe,
        ...action.payload.updatedRecipe
      };
      const recipes = [...state.recipes];
      recipes[action.payload.index] = updateRecipe;
      return {
        ...state,
        recipes: recipes
      };
    case (RecipeActions.DELETE_RECIPE):
      const deletedRecipes = [...state.recipes];
      deletedRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: deletedRecipes
      };
    default:
      return state;
  }
}
