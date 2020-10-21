import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/take';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../../services/recipe.service';
import * as fromRecipe from '../store/recipe.reducer';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipe: Recipe;
  recipeState: Observable<fromRecipe.State>;
  id: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    // the below method will only work when the first time loaded component.
    // So if we use this the first time loaded recipe will be still there when we try to load another one.
    // This happen because of snapshot.
    // Because of these resons we can't use the below method
    // const id = this.route.snapshot.params['id'];

    // Instead we need to use the params Observable to subscribe to recate to the id when it get changes
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipeState = this.store.select('recipes');
      }
    );

  }
  onAddToShoppingList() {
    this.store.select('recipes')
    .take(1)
    .subscribe((recipeState: fromRecipe.State) => {
      this.recipeService.addIngToShoppingLi(recipeState.recipes[this.id].ingredient);
    });
  }

  onEditRecipe() {
    // this.router.navigate(['edit'], {relativeTo: this.route});
    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDelete() {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    // this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
