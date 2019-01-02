import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipes/recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers : [ ]
})
export class AppComponent implements OnInit {
	
	constructor(private recipeService : RecipeService, private shoppingListService : ShoppingListService) {}


	ngOnInit() {
		firebase.initializeApp({
			apiKey: "AIzaSyDlYku5NXL7gz33w-EnATHX2EGkHyLpO2w",
			authDomain: "ng-recipe-book-f1ffb.firebaseapp.com"
		})
	}
}
