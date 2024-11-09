import { Module } from '@nestjs/common';
import { OpenApiService } from './open-api.service';
import { HttpModule } from '@nestjs/axios';
import { OAuth2Service } from './auth/oauth2.service';
import { OpenApiController } from './open-api.controller';


@Module({
  imports: [HttpModule],
  providers: [OpenApiService, OAuth2Service],
  controllers: [OpenApiController],
  exports: [OpenApiService],
})
export class OpenApiModule {}
