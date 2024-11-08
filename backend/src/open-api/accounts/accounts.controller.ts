import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAccounts(@Req() request) {
    const user = request.user;
    return this.accountsService.getAccounts(user);
  }
} 