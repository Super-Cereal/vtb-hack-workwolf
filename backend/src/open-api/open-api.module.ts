import { Module } from '@nestjs/common';
import { OpenApiService } from './open-api.service';
import { HttpModule } from '@nestjs/axios';
import { AccountsService } from './accounts/accounts.service';
import { OAuth2Service } from './auth/oauth2.service';
import { AccountsController } from './accounts/accounts.controller';

@Module({
  imports: [HttpModule],
  providers: [OpenApiService, AccountsService, OAuth2Service],
  controllers: [AccountsController],
  exports: [OpenApiService],
})
export class OpenApiModule {}
