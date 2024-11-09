import { Controller, Get, Post, Body, Param, Req, Query, Headers } from '@nestjs/common';
import { OpenApiService } from './open-api.service';
import { AccountsResponse, ConsentResponse } from './accounts.types';

@Controller('api')
export class OpenApiController {
  constructor(private readonly openApiService: OpenApiService) {}

  @Get('accounts')
  async getAccounts(
    @Req() request: any,
    @Query('page') page: number = 0,
    @Headers() headers: any,
  ): Promise<AccountsResponse> {
    return this.openApiService.getAccounts(request, { page: page.toString(), ...headers });
  }

  @Post('account-consents')
  async createAccountConsent(
    @Req() request: any,
    @Headers() headers: any,
  ): Promise<ConsentResponse> {
    return this.openApiService.createAccountConsent(request, headers);
  }

  @Get('account-consents/:consentId')
  async getAccountConsent(
    @Param('consentId') consentId: string,
    @Req() request: any,
    @Headers() headers: any,
  ): Promise<ConsentResponse> {
    return this.openApiService.getAccountConsent(consentId, request, headers);
  }
}
