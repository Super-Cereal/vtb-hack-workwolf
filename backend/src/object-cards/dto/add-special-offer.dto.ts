import { ApiProperty } from '@nestjs/swagger';

export class AddorRemoveSpecialOfferDto {
  @ApiProperty({ description: 'The ID of the user' })
  userId: string;

  @ApiProperty({ description: 'The ID of the special offer' })
  specialOfferId: string;
}

export class SpecialOfferDto {
  @ApiProperty({ description: 'The ID of the special offer' })
  specialOfferId: string;
}
