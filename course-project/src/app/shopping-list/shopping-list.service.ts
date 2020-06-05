import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged: Subject<Ingredient[]> = new Subject();
  startedEditing: Subject<number> = new Subject();

  private ingredients: Ingredient[] = [
    // new Ingredient('Apples', 5),
    // new Ingredient('Tomatoes', 10)
  ];

  get getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(id: number) {
    return this.ingredients[id];
  }

  onAddIngredient(ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  constructor() { }
}
