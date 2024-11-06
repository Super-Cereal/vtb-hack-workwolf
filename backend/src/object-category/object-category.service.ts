import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ObjectCategory } from 'src/models/object-category.model';
import { CreateObjectCategoryDto } from './dto/create-object-category.dto';
import { UpdateObjectCategoryDto } from './dto/update-object-category.dto';

@Injectable()
export class ObjectCategoryService {
  constructor(
    @InjectModel(ObjectCategory)
    private objectCategoryModel: typeof ObjectCategory,
  ) {}

  async createObjectCategory(
    createObjectCategoryDto: CreateObjectCategoryDto,
  ): Promise<ObjectCategory> {
    return this.objectCategoryModel.create(createObjectCategoryDto);
  }

  async findAllObjectCategories(): Promise<ObjectCategory[]> {
    return this.objectCategoryModel.findAll();
  }

  async findObjectCategoryById(id: number): Promise<ObjectCategory> {
    const objectCategory = await this.objectCategoryModel.findByPk(id);
    if (!objectCategory) {
      throw new NotFoundException('ObjectCategory not found');
    }
    return objectCategory;
  }

  
  async updateObjectCategory(
    id: number,
    updateObjectCategoryDto: UpdateObjectCategoryDto,
  ): Promise<ObjectCategory> {
    const [updatedRows] = await this.objectCategoryModel.update(updateObjectCategoryDto, {
      where: { id },
      returning: true,
    });

    if (updatedRows === 0) {
      throw new NotFoundException('ObjectCategory not found');
    }

    return this.findObjectCategoryById(id);
  }

  async deleteObjectCategory(id: number): Promise<void> {
    const deletedRows = await this.objectCategoryModel.destroy({ where: { id } });
    if (deletedRows === 0) {
      throw new NotFoundException('ObjectCategory not found');
    }
  }
}
