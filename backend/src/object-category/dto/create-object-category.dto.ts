import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { ObjectCategoryEnum } from 'src/models/object-category.model';

export class CreateObjectCategoryDto {
  @ApiProperty({ example: 'Category Name', description: 'The name of the object category' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Category Description',
    description: 'The description of the object category',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: ObjectCategoryEnum.SUPERMARKETS,
    description: 'The category type',
    enum: ObjectCategoryEnum,
  })
  @IsEnum(ObjectCategoryEnum)
  category: ObjectCategoryEnum;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'The URL of the object image',
    required: false,
  })
  @IsOptional()
  @IsString()
  ObjectImg?: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426655440000',
    description: 'The ID of the partner banner',
    required: false,
  })
  @IsOptional()
  @IsString()
  partnerBannerId?: string;
}

export class CreateManyObjectCategoriesDto {
  @ApiProperty({
    type: [CreateObjectCategoryDto],
    description: 'Array of object categories to create',
  })
  objectCategories: CreateObjectCategoryDto[];
}
