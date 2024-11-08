import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { OAuth2Service } from './auth/oauth2.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OpenApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly oauth2Service: OAuth2Service,
  ) {}

  private generateHeaders(request: any, additionalHeaders: any = {}): any {
    const headers = {
      'x-customer-user-agent': request.headers['user-agent'] || 'unknown',
      'x-fapi-auth-date': new Date().toUTCString(),
      'x-fapi-interaction-id': uuidv4(),
      'x-fapi-customer-ip-address': request.ip || 'unknown',
      ...additionalHeaders,
    };
    return headers;
  }

  async createAccountConsent(
    data: any,
    request: any,
    additionalHeaders: any = {},
  ): Promise<AxiosResponse> {
    const accessToken = await this.oauth2Service.getAccessToken();
    const headers = this.generateHeaders(request, additionalHeaders);
    headers.Authorization = `Bearer ${accessToken}`;
    headers['x-idempotency-key'] = uuidv4().substring(0, 40);

    const response = await firstValueFrom(
      this.httpService.post(
        'https://api.bankingapi.ru/extapi/aft/clientInfo/hackathon/v1/account-consents',
        data,
        {
          headers,
        },
      ),
    );
    return response.data;
  }

  async getAccountConsent(
    consentId: string,
    request: any,
    additionalHeaders: any = {},
  ): Promise<AxiosResponse> {
    const accessToken = await this.oauth2Service.getAccessToken();
    const headers = this.generateHeaders(request, additionalHeaders);
    headers.Authorization = `Bearer ${accessToken}`;

    const response = await firstValueFrom(
      this.httpService.get(
        `https://api.bankingapi.ru/extapi/aft/clientInfo/hackathon/v1/account-consents/${consentId}`,
        {
          headers,
        },
      ),
    );
    return response.data;
  }

  async getAccounts(request: any, additionalHeaders: any = {}): Promise<AxiosResponse> {
    const accessToken = await this.oauth2Service.getAccessToken();
    const headers = this.generateHeaders(request, additionalHeaders);
    headers.Authorization = `Bearer ${accessToken}`;

    const response = await firstValueFrom(
      this.httpService.get(
        'https://api.bankingapi.ru/extapi/aft/clientInfo/hackathon/v1/accounts',
        {
          headers,
        },
      ),
    );
    return response.data;
  }
}
