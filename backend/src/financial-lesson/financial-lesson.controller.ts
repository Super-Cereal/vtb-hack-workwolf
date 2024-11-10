import { Controller, Post, Body, UsePipes, ValidationPipe, UseGuards, Get, Req } from '@nestjs/common';
import { FinancialLessonService } from './financial-lesson.service';
import { CreateFinancialLessonDto } from './dto/create-financial-lesson.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Financial Lessons')
@Controller('financial-lessons')
export class FinancialLessonsController {
  constructor(private readonly financialLessonService: FinancialLessonService) {}

  @ApiOperation({ summary: 'Create a new financial lesson' })
  @ApiResponse({ status: 201, description: 'The financial lesson has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request, validation failed.' })
  @Post()
  @UsePipes(new ValidationPipe())
  async createFinancialLesson(@Body() createFinancialLessonDto: CreateFinancialLessonDto) {
    return this.financialLessonService.createFinancialLesson(createFinancialLessonDto);
  }

  @ApiOperation({ summary: 'Get financial lessons by User ID' })
  @ApiResponse({ status: 200, description: 'The list of financial lessons for the specified user.' })
  @ApiResponse({ status: 401, description: 'Unauthorized, invalid or missing token.' })
  @ApiResponse({ status: 404, description: 'No financial lessons found for this user.' })
  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  async getUserFinancialLessons(@Req() request) {
    const userId = request.user.id;
    return this.financialLessonService.getUserFinancialLessons(userId);
  }
}
