export interface PassportDetails {
  number: string;
  country: string;
}

export interface PersonalDetails {
  firstname: string;
  lastname: string;
  dateOfBirth?: string;
  citizenship?: string;
  language?: string;
  maritalStatus?: string;
  passport?: PassportDetails;
  taxIdentificationNumber?: string;
}

export interface ContactDetails {
  phoneNumber: string;
  faxNumber: string;
  toContact: {
    toContactDate: string;
    alreadyContacted: boolean;
  };
}

export interface AccountConfiguration {
  partnerId?: string | null;
  branchUuid?: string;
  roleUuid?: string;
  accountManagerUuid?: string;
  ibParentTradingAccountUuid?: string;
  crmUserScope?: {
    branchScope: string[];
    managerPools: string[];
  };
  accountTypeContact?: boolean;
}

export interface AddressDetails {
  country: string;
  state: string;
  city: string;
  postCode: string;
  address: string;
}

export interface BankingDetails {
  bankAddress: string;
  bankSwiftCode: string;
  bankAccount: string;
  bankName: string;
  accountName: string;
}

export interface LeadDetails {
  statusUuid: string;
  source: string;
  providerUuid: string;
  becomeActiveClientTime: string;
}

export interface CreateAccountRequest {
  email: string;
  password: string;
  offerUuid?: string;
  clientType?: 'RETAIL';
  createAsDepositedAccount?: boolean;
  personalDetails: PersonalDetails;
  contactDetails?: ContactDetails;
  accountConfiguration?: AccountConfiguration;
  addressDetails?: AddressDetails;
  bankingDetails?: BankingDetails;
  leadDetails?: LeadDetails;
}

export interface CreateAccountResponse {
  uuid: string;
  oneTimeToken?: string;
  created: string;
  updated: string;
  email: string;
  verificationStatus: 'NEW';
  type: 'RETAIL';
  personalDetails: PersonalDetails;
  contactDetails?: ContactDetails;
  accountConfiguration: {
    partnerId: string | null;
    branchUuid: string;
    roleUuid: string;
    accountManager: {
      uuid: string;
      email: string;
      name: string;
    };
    ibParentTradingAccountUuid: string;
    crmUserScope: {
      branchScope: string[];
      managerPools: string[];
    };
    accountTypeContact: boolean;
  };
  addressDetails?: AddressDetails;
  bankingDetails?: BankingDetails;
  leadDetails?: LeadDetails;
}

export interface ChallengeTargets {
  maxDailyLoss: number | null;
  maxLoss: number | null;
  profitTarget: number | null;
  maxDailyLossEquityLevel: number | null;
  maxLossEquityLevel: number | null;
  profitTargetEquityLevel: number | null;
}

export interface ChallengeDetails {
  challengeUuid: string;
  phaseStep: number | null;
  status: 'ACTIVE_PARTICIPATING_IN_CHALLENGE';
  daysTraded: number | null;
  endOfDayBalanceSnapshot: number | null;
  isReadyForEvaluation: boolean;
  challengeTargets: ChallengeTargets;
}

export interface CreateTradingAccountRequest {
  challengeId: string;
  accountUuid: string;
  name: string;
}

export interface CreateTradingAccountResponse {
  id: string;
  brokerId: string | null;
  login: string | null;
  email: string;
  created: string;
  challengeDetails: ChallengeDetails;
}

export interface TradingAccountQueryParams {
  instantlyActive: boolean;
  phaseStep: number;
  addOnIds?: string[];
}

export type GetAccountByEmailResponse = CreateAccountResponse;

export interface CreateMTTDemoAccountParams {
  firstName: string;
  lastName: string;
  email: string;
} 