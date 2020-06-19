import {Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions'
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes: Recipe[] = [];
  recipesChanged = new Subject<Recipe[]>();

  constructor(
    private store: Store<fromShoppingList.AppState>
  ) { }

  set setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes);
  }

  get getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  // This is a waste of code, just call addIngredients from ShoppingListService.
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients))
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updatedRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
