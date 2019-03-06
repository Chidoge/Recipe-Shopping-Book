import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

@Injectable()
export class DataStorageService {
	constructor(private http: Http,
							private recipeService: RecipeService,
							private store: Store<fromApp.AppState>
							) {
	}

	storeRecipes() {

		let token;
		this.store.select('auth').take(1).subscribe(
			(authState: fromAuth.State) => {
				token = authState.token;
			}
		);
			

		return this.http.put('https://ng-recipe-book-f1ffb.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
	}

	getRecipes() {

		let token;
		this.store.select('auth').take(1).subscribe(
			(authState: fromAuth.State) => {
				token = authState.token;
			}
		);

		this.http.get('https://ng-recipe-book-f1ffb.firebaseio.com/recipes.json?auth=' + token)
			.map(
				(response: Response) => {
					const recipes: Recipe[] = response.json();
					for (let recipe of recipes) {
						if (!recipe['ingredients']) {
							recipe['ingredients'] = [];
						}
					}
					return recipes;
				}
			)
			.subscribe(
				(recipes: Recipe[]) => {
					this.recipeService.setRecipes(recipes);
				}
			);
	}
}
