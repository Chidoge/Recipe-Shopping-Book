import { EventEmitter } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {

	private ingredientAdded = new EventEmitter<void>();

	private ingredients: Ingredient[] = [
		new Ingredient('Apple',5),
		new Ingredient('Tomato',10),
	];

	getIngredients() {
		return this.ingredients.slice();
	}

	addIngredient(ingredient : Ingredient) {
		this.ingredients.push(ingredient);
		this.ingredientAdded.emit();
	}

	addIngredients(ingredients : Ingredient[]) {
		this.ingredients.push(...ingredients);
		this.ingredientAdded.emit();
	}

	isIngredientAdded() {
		return this.ingredientAdded;
	}


}