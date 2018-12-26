import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

import { ShoppingListService } from './shopping-list.service';

@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html',
	styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

	public ingredients: Ingredient[] = [];
	private subscription : Subscription;

	constructor(private shoppingListService : ShoppingListService) {}

	ngOnInit() {

		this.ingredients = this.shoppingListService.getIngredients();

		/* When ingredient is added, an event is emitted which should update the ingredients since 
			this class only stores a COPY of the ingredients and not a reference to the array stored in 
			the service class. */
		this.subscription = this.shoppingListService.isIngredientAdded()
		.subscribe(
			() => {
				this.ingredients = this.shoppingListService.getIngredients();
			}
		)
	}

	onEditItem(id : number) {
		this.shoppingListService.startedEditing.next(id);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}





}
