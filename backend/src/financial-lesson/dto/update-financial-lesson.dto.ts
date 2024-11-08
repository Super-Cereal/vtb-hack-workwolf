import { PartialType } from '@nestjs/swagger';
import { CreateFinancialLessonDto } from './create-financial-lesson.dto';

export class UpdateFinancialLessonDto extends PartialType(CreateFinancialLessonDto) {}
