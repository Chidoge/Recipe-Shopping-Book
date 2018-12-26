import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from  './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()


export class RecipeService {

	private recipes: Recipe[] = [
		new Recipe(
			'Tasty schnitzel',
			'A super-tasty schnitzel - just awesome',
			'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
			[
				new Ingredient("Meat", 1),
				new Ingredient("French fries", 20)
			]
		),

		new Recipe(
			'Big fat burger',
			'What else do you need to say?',
			'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
			[
				new Ingredient('Buns', 2),
				new Ingredient('Meat', 1),
				new Ingredient('Lettuce', 1),
				new Ingredient('Tomato', 1),
				new Ingredient('Onion slices', 2)
			]
		)
	]

	private selectedRecipe : Recipe;

	constructor(private shoppingListService : ShoppingListService){}

	getRecipes() {
		/* Call slice method to return a COPY of the recipes */
		return this.recipes.slice();
	}

	getRecipe(id : number) {
		return this.recipes[id];
	}

	addIngredientsToShoppingList(ingredients : Ingredient[]) {
		this.shoppingListService.addIngredients(ingredients);
	}
}