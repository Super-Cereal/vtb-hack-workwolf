import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ObjectCategoryService } from './object-category.service';
import { CreateObjectCategoryDto } from './dto/create-object-category.dto';
import { UpdateObjectCategoryDto } from './dto/update-object-category.dto';

@Controller('object-categories')
export class ObjectCategoryController {
  constructor(private readonly objectCategoryService: ObjectCategoryService) {}

  @Post()
  async createObjectCategory(@Body() createObjectCategoryDto: CreateObjectCategoryDto) {
    return this.objectCategoryService.createObjectCategory(createObjectCategoryDto);
  }

  @Get()
  async findAllObjectCategories() {
    return this.objectCategoryService.findAllObjectCategories();
  }

  @Get(':id')
  async findObjectCategoryById(@Param('id') id: number) {
    return this.objectCategoryService.findObjectCategoryById(id);
  }

  @Put(':id')
  async updateObjectCategory(
    @Param('id') id: number,
    @Body() updateObjectCategoryDto: UpdateObjectCategoryDto,
  ) {
    return this.objectCategoryService.updateObjectCategory(id, updateObjectCategoryDto);
  }

  @Delete(':id')
  async deleteObjectCategory(@Param('id') id: number) {
    return this.objectCategoryService.deleteObjectCategory(id);
  }
}
