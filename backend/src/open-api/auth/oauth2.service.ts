import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OAuth2Service {
  private readonly clientId = 'team035';
  private readonly clientSecret = 'gRYkcmgzmYjWmK0ZXMICnWB0iMGOQh5e';
  private readonly tokenUrl =
    'https://auth.bankingapi.ru/auth/realms/kubernetes/protocol/openid-connect/token';

  constructor(private readonly httpService: HttpService) {}

  async getAccessToken(): Promise<string> {
    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');
    data.append('client_id', this.clientId);
    data.append('client_secret', this.clientSecret);

    const response = await firstValueFrom(
      this.httpService.post(this.tokenUrl, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }),
    );

    return response.data.access_token;
  }
}
