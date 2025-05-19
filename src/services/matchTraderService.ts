import {
  CreateAccountRequest,
  CreateAccountResponse,
  CreateTradingAccountRequest,
  CreateTradingAccountResponse,
  TradingAccountQueryParams,
  GetAccountByEmailResponse,
  CreateMTTDemoAccountParams
} from '../types/matchTrader.types';
import { mttAccountService } from './mttAccountService';
import { mttTradingAccountService } from './mttTradingAccountService';

const AUTH_TOKEN = "Bearer vL151ojBexVGnlLYXUR4vIdXuA-xXxiCqwqDSR5bIws=";

export const createMatchTraderAccount = async (
  requestData: CreateAccountRequest,
): Promise<CreateAccountResponse> => {
  try {
    const response = await fetch('/api/match-trader/v1/accounts', {
      method: 'POST',
      headers: {
        'Authorization': AUTH_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || `Failed to create account: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error: any) {
    console.error('Error creating Match Trader account:', error);
    throw error;
  }
};

export const createTradingAccount = async (
  requestData: CreateTradingAccountRequest,
  queryParams: TradingAccountQueryParams
): Promise<CreateTradingAccountResponse> => {
  try {
    // Construct query string
    const queryParamsObj: Record<string, string> = {
      instantlyActive: queryParams.instantlyActive.toString(),
      phaseStep: queryParams.phaseStep.toString(),
    };

    if (queryParams.addOnIds?.length) {
      queryParamsObj.addOnIds = queryParams.addOnIds.join(',');
    }

    const queryString = new URLSearchParams(queryParamsObj).toString();

    const response = await fetch(
      `/api/match-trader/v1/prop/accounts?${queryString}`,
      {
        method: 'POST',
        headers: {
          'Authorization': AUTH_TOKEN,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || `Failed to create trading account: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error: any) {
    console.error('Error creating trading account:', error);
    throw error;
  }
};

export const getAccountByEmail = async (
  email: string
): Promise<GetAccountByEmailResponse> => {
  try {
    const response = await fetch(
      `/api/match-trader/v1/accounts/by-email/${email}`,
      {
        method: 'GET',
        headers: {
          'Authorization': AUTH_TOKEN,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || `Failed to get account: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error: any) {
    console.error('Error getting account by email:', error);
    throw error;
  }
};

const generateRandomPassword = (): string => {
  const length = 12;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

export const createMTTDemoAccount = async (
  params: CreateMTTDemoAccountParams
): Promise<{
  success: boolean;
  message: string;
  accountData?: CreateAccountResponse;
  tradingAccountData?: CreateTradingAccountResponse;
}> => {
  try {
    // Check if email is already in use
    let mttAccount: CreateAccountResponse | undefined;
    let mttPassword: string | undefined;
    try {
      const existingAccount = await getAccountByEmail(params.email);
      

      mttAccount = existingAccount;

    } catch (error: any) {
        
      // Generate random password
      const password = generateRandomPassword();
      mttPassword = password;
      // Create account request
      const accountRequest: CreateAccountRequest = {
        email: params.email,
        password,
        clientType: "RETAIL",
        createAsDepositedAccount: true,
        personalDetails: {
          firstname: params.firstName,
          lastname: params.lastName,
        },
      };

      // Step 1: Create Match Trader account
      const accountResponse = await createMatchTraderAccount(accountRequest);

      // Step 2: Store account data in mttAccountService
      const { uuid, created, updated, verificationStatus, type, ...restAccountData } = accountResponse;
      await mttAccountService.createAccount({
        uuid,
        created,
        updated,
        verificationStatus,
        type,
        password: mttPassword || "",
      ...restAccountData
      });

      
      mttAccount = accountResponse;
    }
    if (!mttAccount) return {success: false, message: ""};

    // Create trading account request
    const tradingAccountRequest: CreateTradingAccountRequest = {
      challengeId: "c1786850-410a-491b-a32c-77831045b79e", // Demo challenge id
      accountUuid: mttAccount.uuid,
      name: `${params.firstName} ${params.lastName}'s Demo Trading Account`
    };

    // Step 3: Create trading account
    const tradingAccountResponse = await createTradingAccount(
      tradingAccountRequest,
      {
        instantlyActive: true,
        phaseStep: 1
      }
    );

    // Step 4: Store trading account data in mttTradingAccountService
    const { id, created: tradingCreated, brokerId, login, challengeDetails, ...restTradingData } = tradingAccountResponse;
    await mttTradingAccountService.createTradingAccount({
      id,
      created: tradingCreated,
      brokerId,
      login,
      name: tradingAccountRequest.name,
      challengeDetails: {
        ...challengeDetails,
        phaseStep: challengeDetails.phaseStep?.toString() ?? null
      },
      ...restTradingData
    });

    return {
      success: true,
      message: 'MTT demo account created successfully',
      accountData: mttAccount,
      tradingAccountData: tradingAccountResponse
    };
  } catch (error: any) {
    console.error('Error creating MTT demo account:', error);
    return {
      success: false,
      message: error.message || 'Failed to create MTT demo account'
    };
  }
}; 