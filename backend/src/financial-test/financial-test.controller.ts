import { Controller, Post, Body, Param } from '@nestjs/common';
import { FinancialTestService } from './financial-test.service';
import { CheckFinancialTestDto } from './dto/financial-test.dto';

@Controller('financial-tests')
export class FinancialTestController {
  constructor(private readonly financialTestService: FinancialTestService) {}

  @Post('check')
  async checkFinancialTest(@Body() data: CheckFinancialTestDto) {
    return this.financialTestService.checkFinancialTest(data);
  }
}
