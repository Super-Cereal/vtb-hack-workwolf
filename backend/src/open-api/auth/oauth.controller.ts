import { Controller, Get } from '@nestjs/common';
import { OAuth2Service } from './oauth2.service';

@Controller('oauth2')
export class OAuth2Controller {
  constructor(private readonly oauth2Service: OAuth2Service) {}

  @Get('token')
  async getToken(): Promise<{ accessToken: string }> {
    const accessToken = await this.oauth2Service.getAccessToken();
    return { accessToken };
  }
}
