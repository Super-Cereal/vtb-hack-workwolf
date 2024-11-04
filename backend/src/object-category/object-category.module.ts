import { Module } from '@nestjs/common';
import { ObjectCategoryService } from './object-category.service';
import { ObjectCategoryController } from './object-category.controller';
import { ObjectCategory } from 'src/models/object-category.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([ObjectCategory])],
  controllers: [ObjectCategoryController],
  providers: [ObjectCategoryService],
})
export class ObjectCategoryModule {}
