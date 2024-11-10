import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ObjectCategoryService } from './object-category.service';
import {
  CreateManyObjectCategoriesDto,
  CreateObjectCategoryDto,
} from './dto/create-object-category.dto';
import { UpdateObjectCategoryDto } from './dto/update-object-category.dto';
import { ApiOperation, ApiResponse, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Object-categories')
@Controller('object-categories')
export class ObjectCategoryController {
  constructor(private readonly objectCategoryService: ObjectCategoryService) {}

  @ApiOperation({ summary: 'Create a new object category' })
  @ApiResponse({ status: 201, description: 'Object category created successfully' })
  @ApiBody({ type: CreateObjectCategoryDto })
  @Post()
  async createObjectCategory(@Body() createObjectCategoryDto: CreateObjectCategoryDto) {
    return this.objectCategoryService.createObjectCategory(createObjectCategoryDto);
  }

  @ApiOperation({ summary: 'Create many object categories' })
  @ApiResponse({ status: 201, description: 'The records have been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({ type: CreateManyObjectCategoriesDto })
  @Post('many')
  createMany(@Body() createManyObjectCategoriesDto: CreateManyObjectCategoriesDto) {
    return this.objectCategoryService.createManyObjectCategories(createManyObjectCategoriesDto);
  }

  @ApiOperation({ summary: 'Get all object categories' })
  @ApiResponse({ status: 200, description: 'List of object categories retrieved successfully' })
  @Get()
  async findAllObjectCategories() {
    return this.objectCategoryService.findAllObjectCategories();
  }

  @ApiOperation({ summary: 'Get an object category by ID' })
  @ApiResponse({ status: 200, description: 'Object category retrieved successfully' })
  @ApiParam({ name: 'id', description: 'The ID of the object category' })
  @Get(':id')
  async findObjectCategoryById(@Param('id') id: string) {
    return this.objectCategoryService.findObjectCategoryById(id);
  }

  @ApiOperation({ summary: 'Update an object category by ID' })
  @ApiResponse({ status: 200, description: 'Object category updated successfully' })
  @ApiParam({ name: 'id', description: 'The ID of the object category' })
  @ApiBody({ type: UpdateObjectCategoryDto })
  @Put(':id')
  async updateObjectCategory(
    @Param('id') id: string,
    @Body() updateObjectCategoryDto: UpdateObjectCategoryDto,
  ) {
    return this.objectCategoryService.updateObjectCategory(id, updateObjectCategoryDto);
  }

  @ApiOperation({ summary: 'Delete an object category by ID' })
  @ApiResponse({ status: 200, description: 'Object category deleted successfully' })
  @ApiParam({ name: 'id', description: 'The ID of the object category' })
  @Delete(':id')
  async deleteObjectCategory(@Param('id') id: number) {
    return this.objectCategoryService.deleteObjectCategory(id);
  }
}
