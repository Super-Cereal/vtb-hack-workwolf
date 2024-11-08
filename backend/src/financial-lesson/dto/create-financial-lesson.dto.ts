import { ApiProperty } from '@nestjs/swagger';

export class CreateFinancialLessonDto {
  @ApiProperty({ description: 'The title of the financial lesson' })
  title: string;

  @ApiProperty({ description: 'The description of the financial lesson' })
  description: string;

  @ApiProperty({ description: '' })
  gamecoins: number;

  @ApiProperty({ description: 'The ID of the user' })
  userId: string;
}