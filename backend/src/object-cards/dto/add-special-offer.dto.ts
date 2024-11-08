import { ApiProperty } from '@nestjs/swagger';

export class AddSpecialOfferDto {
  @ApiProperty({ description: 'The ID of the user' })
  userId: string;

  @ApiProperty({ description: 'The ID of the special offer' })
  specialOfferId: string;
}
