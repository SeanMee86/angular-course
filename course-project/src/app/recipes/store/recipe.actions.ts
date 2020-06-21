import {Action} from "@ngrx/store";
import {Recipe} from "../recipe.model";

export const SET_RECIPES = '[Recipe] SET_RECIPES';
export const ADD_RECIPE = '[Recipes] ADD_RECIPE';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;
  constructor(public payload: Recipe[]) {
  }
}

export type RecipeActions =
  | SetRecipes;
