import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePartnerBannerDto {
  @ApiProperty({ example: 'https://example.com/banner.jpg', description: 'The URL of the partner banner' })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({ example: 'A description of the banner', description: 'The description of the partner banner', required: false })
  @IsOptional()
  @IsString()
  desc?: string;

  @ApiProperty({ example: 'Banner Name', description: 'The name of the partner banner' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'category-id-123', description: 'The ID of the object category' })
  @IsString()
  @IsNotEmpty()
  ObjectCategoryId: string;
}
