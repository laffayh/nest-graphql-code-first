import { lastValueFrom, of } from 'rxjs';

import { FakeBDDService } from '../shared/services/fake-BDD.service';
import { Injectable } from '@nestjs/common';
import { NewRecipeInput } from './dto/new-recipe.input';
import { Recipe } from './models/recipe.model';
import { RecipesArgs } from './dto/recipes.args';

@Injectable()
export class RecipesService {
  constructor(private bdd: FakeBDDService) {}

  async create(data: NewRecipeInput): Promise<Recipe> {
    const newRecipe$ = of(this.bdd.add<NewRecipeInput>(data));

    return lastValueFrom(newRecipe$);
  }

  async findOneById(id: string): Promise<Recipe> {
    const foundRecipe$ = of(this.bdd.getById<Recipe>(id));

    return lastValueFrom(foundRecipe$);
  }

  async findAll({ skip, take }: RecipesArgs): Promise<Recipe[]> {
    const allRecipes$ = of(this.bdd.getAll<Recipe>(skip, take));

    return lastValueFrom(allRecipes$);
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
