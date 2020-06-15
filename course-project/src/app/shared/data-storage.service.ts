import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from '../recipes/recipes.service';
import { map, tap} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  rootURL = 'https://ng-recipe-book-18f5d.firebaseio.com';

  constructor(
    private http: HttpClient,
    private recipesService: RecipesService,
    private authService: AuthService
  ) { }

  storeData() {
    const recipes = this.recipesService.getRecipes;
    this.http
      .put<Recipe[]>(`${this.rootURL}/recipes.json`, recipes)
      .subscribe(
      res => {
        console.log(res);
      }
    );
  }

  fetchData() {
    return this.http.get<Recipe[]>(`${this.rootURL}/recipes.json`).pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(recipes => {
        this.recipesService.setRecipes = recipes;
      })
    );
  }
}

