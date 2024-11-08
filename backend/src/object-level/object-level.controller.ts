import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ObjectLevelService } from './object-level.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateManyObjectLevelsDto, CreateObjectLevelDto } from './dto/create-object-level.dto';
import { UpdateObjectLevelDto } from './dto/update-object-level.dto';

@ApiTags('object-levels')
@Controller('object-levels')
export class ObjectLevelController {
  constructor(private readonly objectLevelService: ObjectLevelService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new object level' })
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createObjectLevelDto: CreateObjectLevelDto) {
    return this.objectLevelService.create(createObjectLevelDto);
  }

  @Post('many')
  @ApiOperation({ summary: 'Create many object levels' })
  @ApiResponse({ status: 201, description: 'The records have been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  createMany(@Body() createManyObjectLevelsDto: CreateManyObjectLevelsDto) {
    return this.objectLevelService.createMany(createManyObjectLevelsDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all object levels' })
  @ApiResponse({ status: 200, description: 'The records have been successfully retrieved.' })
  findAll() {
    return this.objectLevelService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single object level by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the object level' })
  @ApiResponse({ status: 200, description: 'The record has been successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Record not found.' })
  findOne(@Param('id') id: string) {
    return this.objectLevelService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an object level by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the object level' })
  @ApiResponse({ status: 200, description: 'The record has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Record not found.' })
  update(@Param('id') id: string, @Body() updateObjectLevelDto: UpdateObjectLevelDto) {
    return this.objectLevelService.update(id, updateObjectLevelDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an object level by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the object level' })
  @ApiResponse({ status: 200, description: 'The record has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Record not found.' })
  remove(@Param('id') id: string) {
    return this.objectLevelService.remove(id);
  }
}
