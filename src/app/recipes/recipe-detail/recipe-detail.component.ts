import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router'; 

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

export class RecipeDetailComponent implements OnInit {

	recipe: Recipe;

	constructor(private recipeService : RecipeService, private route : ActivatedRoute, private router : Router) {}

	ngOnInit() {
		this.route.params.subscribe(
			(params : Params) => {
				this.id = +params['id'];
				this.recipe = this.recipeService.getRecipe(this.id);
				if (!this.recipe) {
					this.recipe =  { 
						name : 'N/A',
						description : 'N/A',
						imagePath : 'N/A',
						ingredients : [

						]

					}
				}
			}
		);
	}

	onEditRecipe() {

		this.router.navigate(['../', this.id, 'edit'] , { relativeTo : this.route});
		//Simple way
		//this.router.navigate(['edit'], { relativeTo : this.route});
	}


	onAddToShoppingList() {
		this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
	}
}
