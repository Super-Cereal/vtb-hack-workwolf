import { ApiProperty } from '@nestjs/swagger';

export class CreateObjectLevelDto {
  @ApiProperty({ description: 'The ID of the object category' })
  objectId: string;

  @ApiProperty({ description: 'The level of the object' })
  level: number;

  @ApiProperty({ description: 'The multi-bonus of the object' })
  gamecoins: number;

  @ApiProperty({ description: 'The cost to reach the next level' })
  nextLevelCost: number;
}

export class CreateManyObjectLevelsDto {
  @ApiProperty({ type: [CreateObjectLevelDto], description: 'Array of object levels to create' })
  objectLevels: CreateObjectLevelDto[];
}
