import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [CategoryController],
  providers: [CategoryRepository]
})
export class CategoryModule { }
