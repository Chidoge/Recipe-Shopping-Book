import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
	selector : 'app-recipe-edit',
	templateUrl : 'recipe-edit.component.html',
	styleUrls : ['recipe-edit.component.css']
})

export class RecipeEditComponent implements OnInit {
	
	id : number;
	editMode : boolean = false;
	recipeForm : FormGroup;

	constructor(private route : ActivatedRoute, private router : Router, private recipeService : RecipeService) {}


	ngOnInit() {

		
		/* Subscribe to route changes */
		this.route.params.subscribe(
			(params : Params) => {
				this.id = +params['id'];
				this.editMode = (params['id'] != null);
			}
		);
		this.initForm();
	}

	private initForm() {

		let recipeName = '';
		let recipeImagePath = '';
		let recipeDescription = '';
		let recipeIngredients = new FormArray([]);

		if (this.editMode) {
			const recipe = this.recipeService.getRecipe(this.id);
			recipeName = recipe.name;
			recipeImagePath = recipe.imagePath;
			recipeDescription = recipe.description;
			if (recipe['ingredients']) {
				for(let ingredient of recipe.ingredients) {
					recipeIngredients.push(new FormGroup({
						'name' : new FormControl(ingredient.name, Validators.required),
						'amount' : new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
					}));
				}
			}
		}

		this.recipeForm = new FormGroup({
			'name' : new FormControl(recipeName, Validators.required),
			'description' : new FormControl(recipeDescription, Validators.required),
			'imagePath' : new FormControl(recipeImagePath, Validators.required),
			'ingredients' : recipeIngredients
		});

	}

	getControls() {
		return (<FormArray>this.recipeForm.get('ingredients')).controls;
    }

    onAddIngredient() {
    	(<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
    		'name' : new FormControl(null, Validators.required),
			'amount' : new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    	}));
    }

	onRemoveIngredient(ingredientIndex : number) {
		(<FormArray>this.recipeForm.get('ingredients')).removeAt(ingredientIndex);
	}

	onCancel() {
		this.router.navigate(['../'], { relativeTo : this.route });
	}

	onSubmit() {

		const name = this.recipeForm.value.name;
		const description = this.recipeForm.value.description;
		const imagePath = this.recipeForm.value.imagePath;
		const ingredients = this.recipeForm.value.ingredients;
		const newRecipe = new Recipe(name, description, imagePath, ingredients);

		if (this.editMode) {
			this.recipeService.updateRecipe(this.id, newRecipe);
		}
		else {
			this.recipeService.addRecipe(newRecipe);
		}
		this.router.navigate(['../'], { relativeTo : this.route });
	}
}