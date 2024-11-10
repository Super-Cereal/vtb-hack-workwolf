import { ApiProperty } from '@nestjs/swagger';

class QuestionDto {
  @ApiProperty({ description: 'The text of the question' })
  text: string;

  @ApiProperty({ description: 'The possible answers for the question', type: [String] })
  answers: string[];

  @ApiProperty({ description: 'The correct answer for the question' })
  rightAnswer: string;
}

class ArticleDto {
  @ApiProperty({ description: 'The name of the article' })
  name: string;

  @ApiProperty({ description: 'The text of the article' })
  text: string;
}

export class CreateFinancialLessonDto {
  @ApiProperty({ description: 'The title of the financial lesson' })
  title: string;

  @ApiProperty({ description: 'The description of the financial lesson' })
  description: string;

  @ApiProperty({ description: 'The number of game coins' })
  gamecoins: number;

  @ApiProperty({ description: 'The list of questions', type: [QuestionDto] })
  questions: QuestionDto[];

  @ApiProperty({ description: 'The article associated with the lesson', type: ArticleDto })
  article: ArticleDto;
}
