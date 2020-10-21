import { NgModule } from '../../../node_modules/@angular/core';
import { Routes, RouterModule } from '../../../node_modules/@angular/router';

import { ShoppingListComponent } from './shopping-list.component';

const shoppingRoute: Routes = [
  {path: '', component: ShoppingListComponent}
];


@NgModule({
imports: [
  RouterModule.forChild(shoppingRoute)
],
exports: [RouterModule]
})

export class ShoppingRouteModule {}
