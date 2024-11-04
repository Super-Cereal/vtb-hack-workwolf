import { PartialType } from '@nestjs/swagger';
import { CreateObjectCardDto } from './create-object-card.dto';

export class UpdateObjectCardDto extends PartialType(CreateObjectCardDto) {}
