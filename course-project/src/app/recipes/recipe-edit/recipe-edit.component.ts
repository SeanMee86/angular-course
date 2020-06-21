import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Params,
  Router
} from '@angular/router';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipesService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
    );
    if (this.editMode) {
      this.recipeService.updatedRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.onCancelRecipe();
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onCancelRecipe() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onRemoveIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.store.select('recipes')
        .pipe(
          map(recipesState => {
            return recipesState.recipes
              .find((recipe, index) => {
                return index === this.id;
              })
          })
        ).subscribe(
          recipe => {
            recipeName = recipe.name;
            recipeImagePath = recipe.imagePath;
            recipeDescription = recipe.description;
            if (recipe['ingredients']) {
              recipe.ingredients.forEach(ingredient => {
                recipeIngredients.push(
                  new FormGroup({
                    'name': new FormControl(ingredient.name, Validators.required),
                    'amount': new FormControl(ingredient.amount, [
                      Validators.required,
                      Validators.pattern(/^[1-9]+[0-9]*$/)
                    ])
                  })
                );
              });
            }
          }
      )
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  get ingredientCtrls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }
}
