import {Component, Input} from '@angular/core';
import {Recipe} from "../recipe.model";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";
import {Ingredient} from "../../shared/ingredient.model";
import {RecipesService} from "../recipes.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {

  @Input() recipe: Recipe;

  constructor(private slService: ShoppingListService, private recipeService: RecipesService) {}
  sendToSL() {
    // Issue here is the possibility of many events being fired, but this requires much less code. Useful in small cases.
    // this.recipe.ingredients.forEach(ingredient => {
    //   this.slService.onAddIngredient(new Ingredient(ingredient.name, ingredient.amount));
    // });
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
