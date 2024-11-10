import { ApiProperty } from '@nestjs/swagger';

class QuestionAnswerDto {
  @ApiProperty({ description: 'The ID of the question' })
  questionId: string;

  @ApiProperty({ description: 'The answer provided by the user' })
  userAnswer: string;
}

export class CheckFinancialTestDto {
  @ApiProperty({ description: 'The ID of the user' })
  userId: string;

  @ApiProperty({ description: 'The ID of the lesson' })
  lessonId: string;

  @ApiProperty({ description: 'The list of questions and answers', type: [QuestionAnswerDto] })
  answers: QuestionAnswerDto[];
}
