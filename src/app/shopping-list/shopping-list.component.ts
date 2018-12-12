import { Component } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';

import { ShoppingListService } from './shopping-list.service';

@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html',
	styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {

	public ingredients: Ingredient[] = [];

	constructor(private shoppingListService : ShoppingListService) {}

	ngOnInit() {

		this.ingredients = this.shoppingListService.getIngredients();

		/* When ingredient is added, an event is emitted which should update the ingredients since 
			this class only stores a COPY of the ingredients and not a reference to the array stored in 
			the service class. */
		this.shoppingListService.isIngredientAdded()
		.subscribe(
			() => {
				this.ingredients = this.shoppingListService.getIngredients();
			}
		)
	}



}
