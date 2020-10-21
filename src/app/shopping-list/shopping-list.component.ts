import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../services/shoppingList.service';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApphStore from '../store/app.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{ ingredients: Ingredient[]}>;
  // private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService, private store: Store<fromApphStore.AppState>) { }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
    // this.subscription = this.shoppingListService.ingredientChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

  onEditItem(index: number) {
    // this.shoppingListService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  // onIngAdded(ingredient: Ingredient) {
  //   this.ingredients.push(ingredient);
  // }

}
