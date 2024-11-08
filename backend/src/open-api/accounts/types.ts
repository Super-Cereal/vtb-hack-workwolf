interface AccountDetail {
  schemeName: string;
  identification: string;
  name: string;
}

interface PartyIdentification {
  schemeName: string;
  identification: string;
}

interface PostalAddress {
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

interface Owner {
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

interface ServiceProvider {
  schemeName: string;
  identification: string;
}

interface Account {
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

interface Data {
  Account: Account[];
}

interface Links {
  self: string;
  first: string;
  prev: string;
  next: string;
  last: string;
}

interface Meta {
  totalPages: number;
}

export interface ApiResponse {
  Data: Data;
  Risk: any;
  Links: Links;
  Meta: Meta;
}
