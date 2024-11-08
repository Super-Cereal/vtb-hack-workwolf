import { Module } from '@nestjs/common';
import { ObjectCategoryService } from './object-category.service';
import { ObjectCategoryController } from './object-category.controller';
import { ObjectCategory } from 'src/models/object-category.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ObjectLevel } from 'src/models/object-level.model';

@Module({
  imports: [SequelizeModule.forFeature([ObjectCategory, ObjectLevel])],
  controllers: [ObjectCategoryController],
  providers: [ObjectCategoryService],
})
export class ObjectCategoryModule {}
