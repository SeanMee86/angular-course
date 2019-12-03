import {EventEmitter, Injectable} from "@angular/core";
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";

@Injectable({
  providedIn: "root"
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

  getRecipes() {
    return this.recipes.slice();
  }

  recipeSelected = new EventEmitter<Recipe>();
  constructor() { }
}
