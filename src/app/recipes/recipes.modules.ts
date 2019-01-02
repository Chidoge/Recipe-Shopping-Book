import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';

import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component'; 
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';


@NgModule({
	declarations : [
		RecipesComponent,
		RecipeListComponent,
		RecipeStartComponent,
		RecipeDetailComponent,
		RecipeItemComponent,
		RecipeEditComponent
	],
	imports : [
		CommonModule,
		ReactiveFormsModule,
		RecipesRoutingModule,
		SharedModule
	]
})

export class RecipesModule {

}