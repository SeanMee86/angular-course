import {Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes: Recipe[] = [
    new Recipe(
      'Thanksgiving Turkey',
      'This a Turkey',
      'https://cdn4.iconfinder.com/data/icons/food-drink-restaurant/96/food-06-512.png',
      [
        new Ingredient('Turkey', 1),
        new Ingredient('Mashed Potatoes', 5)
      ]
    ),
    new Recipe(
      'Spicy Thai Bowl',
      'This a Spicy Bowl!',
      'https://cdn1.iconfinder.com/data/icons/thai/500/thai-asian-tahiland_14-512.png',
      [
        new Ingredient('Rice', 2),
        new Ingredient('Peppers', 2000)
      ]
    )
  ];
  recipesChanged: Subject<Recipe[]> = new Subject();

  constructor(private slService: ShoppingListService) { }

  get getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  // This is a waste of code, just call addIngredients from ShoppingListService.
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
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
