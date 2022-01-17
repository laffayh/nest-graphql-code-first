import { DateScalar } from '../common/scalars/date.scalar';
import { Module } from '@nestjs/common';
import { RecipesResolver } from './recipes.resolver';
import { RecipesService } from './recipes.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [RecipesResolver, RecipesService, DateScalar],
})
export class RecipesModule {}
