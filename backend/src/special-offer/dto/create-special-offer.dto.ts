import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsUUID, ValidateNested } from 'class-validator';


export class CreateSpecialOfferDto {
  @IsString()
  sale: string;

  @IsUUID()
  objectLevelId: string;
}

export class CreateManySpecialOffersDto {
    @ApiProperty({ type: [CreateSpecialOfferDto], description: 'Array of special offers to create' })
    @ValidateNested({ always: true })
    @Type(() => CreateSpecialOfferDto)
    specialOffers: CreateSpecialOfferDto[];
  }
