import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d6/Tracer_Overwatch.png/220px-Tracer_Overwatch.png'),
    new Recipe('A Test Recipe#2', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d6/Tracer_Overwatch.png/220px-Tracer_Overwatch.png')
  ];

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe){
    this.recipeWasSelected.emit(recipe);
  }
}
