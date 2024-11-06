import { Injectable, HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { OAuth2Service } from '../auth/oauth2.service';

@Injectable()
export class OpenApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly oauth2Service: OAuth2Service,
  ) {}

  async createAccountConsent(data: any, headers: any): Promise<AxiosResponse> {
    const accessToken = await this.oauth2Service.getAccessToken();
    const response = await firstValueFrom(
      this.httpService.post('https://api.example.com/account-consents', data, {
        headers: {
          ...headers,
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    );
    return response.data;
  }

  async getAccountConsent(consentId: string, headers: any): Promise<AxiosResponse> {
    const accessToken = await this.oauth2Service.getAccessToken();
    const response = await firstValueFrom(
      this.httpService.get(`https://api.example.com/account-consents/${consentId}`, {
        headers: {
          ...headers,
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    );
    return response.data;
  }

  async getAccounts(headers: any): Promise<AxiosResponse> {
    const accessToken = await this.oauth2Service.getAccessToken();
    const response = await firstValueFrom(
      this.httpService.get('https://api.example.com/accounts', {
        headers: {
          ...headers,
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    );
    return response.data;
  }
}