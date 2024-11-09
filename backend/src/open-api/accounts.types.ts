export interface Account {
  accountId: string;
  status: string;
  statusUpdateDateTime: string;
  currency: string;
  accountType: string;
  accountSubType: string;
  accountDescription: string;
  AccountDetails: AccountDetail[];
  Owner: Owner;
  ServiceProvider: ServiceProvider;
}

export interface AccountDetail {
  schemeName: string;
  identification: string;
  name: string;
}

export interface Owner {
  name: string;
  mobileNumber: string;
  countryOfResidence: string;
  countryOfBirth: string;
  provinceOfBirth: string;
  cityOfBirth: string;
  birthDate: string;
  PartyIdentification: PartyIdentification[];
  PostalAddress: PostalAddress[];
}

export interface PartyIdentification {
  schemeName: string;
  identification: string;
}

export interface PostalAddress {
  addressType: string;
  department: string;
  subDepartment: string;
  streetName: string;
  buildingNumber: string;
  postCode: string;
  townName: string;
  countrySubDivision: string;
  country: string;
  addressLine: string[];
}

export interface ServiceProvider {
  schemeName: string;
  identification: string;
}

export interface AccountsResponse {
  Data: {
    Account: Account[];
  };
  Risk: any;
  Links: {
    self: string;
    first: string;
    prev: string;
    next: string;
    last: string;
  };
  Meta: {
    totalPages: number;
  };
}

export interface ConsentResponse {
  Data: {
    consentId: string;
    status: string;
    statusUpdateDateTime: string;
    creationDateTime: string;
    permissions: string[];
    expirationDateTime: string;
    transactionFromDateTime: string;
    transactionToDateTime: string;
  };
  Risk: any;
  Links: {
    self: string;
  };
  Meta: {
    totalPages: string;
  };
}
