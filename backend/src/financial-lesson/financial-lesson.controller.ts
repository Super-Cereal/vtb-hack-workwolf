import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CreateFinancialLessonDto } from './dto/create-financial-lesson.dto';
import { UpdateFinancialLessonDto } from './dto/update-financial-lesson.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { FinancialLessonsService } from './financial-lesson.service';
import { FinancialLesson } from 'src/models/financial-lesson.model';

@ApiTags('FinancialLessons')
@Controller('financial-lessons')
export class FinancialLessonsController {
  constructor(private readonly financialLessonsService: FinancialLessonsService) {}

  @ApiOperation({ summary: 'Create a new FinancialLesson' })
  @ApiResponse({ status: 201, description: 'The FinancialLesson has been successfully created.' })
  @ApiBody({ type: CreateFinancialLessonDto })
  @Post()
  async createFinancialLesson(@Body() createFinancialLessonDto: CreateFinancialLessonDto) {
    return this.financialLessonsService.createFinancialLesson(createFinancialLessonDto);
  }

  @ApiOperation({ summary: 'Get all FinancialLessons' })
  @ApiResponse({ status: 200, description: 'The list of FinancialLessons.' })
  @Get()
  async findAllFinancialLessons() {
    return this.financialLessonsService.findAllFinancialLessons();
  }

  @ApiOperation({ summary: 'Get FinancialLesson by ID' })
  @ApiResponse({ status: 200, description: 'The FinancialLesson with the specified ID.' })
  @Get(':id')
  async findFinancialLessonById(@Param('id') id: string) {
    return this.financialLessonsService.findFinancialLessonById(id);
  }

  @ApiOperation({ summary: 'Update a FinancialLesson' })
  @ApiResponse({ status: 200, description: 'The FinancialLesson has been successfully updated.' })
  @ApiBody({ type: UpdateFinancialLessonDto })
  @Put(':id')
  async updateFinancialLesson(
    @Param('id') id: string,
    @Body() updateFinancialLessonDto: UpdateFinancialLessonDto,
  ) {
    return this.financialLessonsService.updateFinancialLesson(id, updateFinancialLessonDto);
  }

  @ApiOperation({ summary: 'Delete a FinancialLesson' })
  @ApiResponse({ status: 200, description: 'The FinancialLesson has been successfully deleted.' })
  @Delete(':id')
  async deleteFinancialLesson(@Param('id') id: string) {
    return this.financialLessonsService.deleteFinancialLesson(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all financial lessons for a user' })
  @ApiResponse({
    status: 200,
    description: 'The list of financial lessons for the user.',
    type: [FinancialLesson],
  })
  @ApiParam({ name: 'userId', description: 'The ID of the user', type: String })
  async getUserFinancialLessons(@Param('userId') userId: string): Promise<FinancialLesson[]> {
    return this.financialLessonsService.getUserFinancialLessons(userId);
  }

  @Post('complete')
  @ApiOperation({ summary: 'Complete a financial lesson for a user' })
  @ApiResponse({
    status: 200,
    description: 'The financial lesson has been successfully completed.',
  })
  async completeFinancialLesson(
    @Body() body: { userId: string; lessonId: string; gameCoins: number },
  ): Promise<void> {
    const { userId, lessonId, gameCoins } = body;
    return this.financialLessonsService.completeFinancialLesson(userId, lessonId, gameCoins);
  }
}
