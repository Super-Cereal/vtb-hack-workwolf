import { Module } from '@nestjs/common';
import { OAuth2Service } from './oauth2.service';
import { HttpModule } from '@nestjs/axios';
import { OAuth2Controller } from './oauth.controller';

@Module({
  imports: [HttpModule],
  providers: [OAuth2Service],
  controllers: [OAuth2Controller],
})
export class OAuth2Module {}
