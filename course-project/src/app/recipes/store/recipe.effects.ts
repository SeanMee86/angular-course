import {Actions, Effect, ofType} from "@ngrx/effects";
import * as RecipesActions from './recipe.actions';
import {map, switchMap, tap, withLatestFrom} from "rxjs/operators";
import {Recipe} from "../recipe.model";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {
  rootURL = 'https://ng-recipe-book-18f5d.firebaseio.com';
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(
      _ => {
        return this.http.get<Recipe[]>(`${this.rootURL}/recipes.json`);
      }
    ),
    map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),
    map(
      recipes => new RecipesActions.SetRecipes(recipes)
    )
  )

  @Effect({dispatch: false})
  storeRecipes = this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(
      ([actionData, recipesState]) => {
        return this.http
          .put<Recipe[]>(`${this.rootURL}/recipes.json`, recipesState.recipes)
      }
    )
  )

  constructor(private actions$: Actions,
              private http: HttpClient,
              private store: Store<fromApp.AppState>) {}
}
