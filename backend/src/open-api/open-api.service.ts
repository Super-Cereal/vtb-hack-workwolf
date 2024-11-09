import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { OAuth2Service } from './auth/oauth2.service';
import { v4 as uuidv4 } from 'uuid';
import { AccountsResponse, ConsentResponse } from './accounts.types';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class OpenApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly oauth2Service: OAuth2Service,
  ) {}

  private generateHeaders(request: any, additionalHeaders: any = {}): any {
    const headers = {
      'x-customer-user-agent': additionalHeaders['x-customer-user-agent'] || request.headers['user-agent'] || 'unknown',
      'x-fapi-auth-date': additionalHeaders['x-fapi-auth-date'] || new Date().toUTCString(),
      'x-fapi-interaction-id': additionalHeaders['x-fapi-interaction-id'] || uuidv4(),
      'x-fapi-customer-ip-address': additionalHeaders['x-fapi-customer-ip-address'] || request.ip || 'unknown',
      ...additionalHeaders,
    };
    return headers;
  }

  private generateConsentData(): any {
    const now = new Date();
    const expirationDateTime = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 дней от текущего момента
    const transactionFromDateTime = now.toISOString();
    const transactionToDateTime = expirationDateTime;

    return {
      Data: {
        permissions: [
          "ReadAccountsBasic",
          "ReadTransactionsDebits",
          "ReadBalances"
        ],
        expirationDateTime,
        transactionFromDateTime,
        transactionToDateTime
      },
      Risk: {}
    };
  }

  async createAccountConsent(
    request: any,
    additionalHeaders: any = {},
  ): Promise<ConsentResponse> {
    const accessToken = await this.oauth2Service.getAccessToken();
    const headers = this.generateHeaders(request, additionalHeaders);
    headers.Authorization = `Bearer ${accessToken}`;
    headers['x-idempotency-key'] = uuidv4().substring(0, 40);

    const data = this.generateConsentData();

    console.log(headers);
    console.log(data);

    const config: AxiosRequestConfig = {
      headers,
      httpsAgent: new (require('https').Agent)({
        rejectUnauthorized: false
      })
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          'https://api.bankingapi.ru/extapi/aft/clientInfo/hackathon/v1/account-consents',
          data,
          config,
        ),
      );
      return response.data;
    } catch (error) {
      console.error('Error creating account consent:', error.response ? error.response.data : error.message);
      throw error;
    }
  }


  async getAccountConsent(
    consentId: string,
    request: any,
    additionalHeaders: any = {},
  ): Promise<ConsentResponse> {
    const accessToken = await this.oauth2Service.getAccessToken();
    const headers = this.generateHeaders(request, additionalHeaders);
    headers.Authorization = `Bearer ${accessToken}`;

    const config: AxiosRequestConfig = {
      headers,
      httpsAgent: new (require('https').Agent)({
        rejectUnauthorized: false
      })
    };

    const response = await firstValueFrom(
      this.httpService.get(
        `https://api.bankingapi.ru/extapi/aft/clientInfo/hackathon/v1/account-consents/${consentId}`,
        config,
      ),
    );
    return response.data;
  }

  async getAccounts(request: any, additionalHeaders: any = {}): Promise<AccountsResponse> {
    const accessToken = await this.oauth2Service.getAccessToken();
    const headers = this.generateHeaders(request, additionalHeaders);
    headers.Authorization = `Bearer ${accessToken}`;

    const config: AxiosRequestConfig = {
      headers,
      httpsAgent: new (require('https').Agent)({
        rejectUnauthorized: false
      })
    };

    const response = await firstValueFrom(
      this.httpService.get(
        'https://api.bankingapi.ru/extapi/aft/clientInfo/hackathon/v1/accounts',
        config,
      ),
    );
    return response.data;
  }
}
