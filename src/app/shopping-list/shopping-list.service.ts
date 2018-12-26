import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {

	private ingredientAdded = new Subject<void>();
	startedEditing = new Subject<number>();

	private ingredients: Ingredient[] = [
		new Ingredient('Apple',5),
		new Ingredient('Tomato',10),
	];

	getIngredients() {
		return this.ingredients.slice();
	}

	getIngredient(index : number) {
		return this.ingredients[index];
	}

	addIngredient(ingredient : Ingredient) {
		this.ingredients.push(ingredient);
		this.ingredientAdded.next();
	}

	addIngredients(ingredients : Ingredient[]) {
		this.ingredients.push(...ingredients);
		this.ingredientAdded.next();
	}

	updateIngredient(index : number, ingredient : Ingredient) {
		this.ingredients[index] = ingredient;
		this.ingredientAdded.next();
	}

	removeIngredient(index : number) {
		this.ingredients.splice(index, 1);
		this.ingredientAdded.next();
	}

	isIngredientAdded() {
		return this.ingredientAdded;
	}


}