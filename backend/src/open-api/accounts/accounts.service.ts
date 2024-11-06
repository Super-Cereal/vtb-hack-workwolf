import { Injectable } from '@nestjs/common';
import { User } from 'src/models/user.model';
import { OpenApiService } from '../open-api.service';
;

@Injectable()
export class AccountsService {
  constructor(private readonly openApiService: OpenApiService) {}

  async getAccounts(user: User) {
    const headers = {
      'x-customer-user-agent': 'your_user_agent',
      'x-fapi-auth-date': new Date().toUTCString(),
      'x-fapi-interaction-id': 'your_interaction_id',
      'x-fapi-customer-ip-address': 'your_ip_address',
    };

    const consentData = {
      Data: {
        // Ваши данные для создания согласия
      },
      Risk: {
        // Ваши данные для оценки риска
      },
    };

    const consentResponse = await this.openApiService.createAccountConsent(consentData, headers);
    const consentId = consentResponse.consentId;

    const accountsResponse = await this.openApiService.getAccounts(headers);
    return accountsResponse;
  }
}