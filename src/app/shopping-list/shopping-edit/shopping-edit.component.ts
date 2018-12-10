import { Component, OnInit, ElementRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {

	@ViewChild('nameInput') nameInputRef: ElementRef;
	@ViewChild('amountInput') amountInputRef: ElementRef;
	@Output() ingredientAdded = new EventEmitter<Ingredient>();


	constructor() { }


	onAddItem() {
		const name = this.nameInputRef.nativeElement.value;
		const amount = this.amountInputRef.nativeElement.value;
		if (name && amount) {
			const newIngredient = new Ingredient(name, amount);
			this.ingredientAdded.emit(newIngredient);	
		}
			
	}

}
