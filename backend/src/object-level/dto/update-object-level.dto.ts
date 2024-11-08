import { PartialType } from '@nestjs/swagger';
import { CreateObjectLevelDto } from './create-object-level.dto';

export class UpdateObjectLevelDto extends PartialType(CreateObjectLevelDto) {}
