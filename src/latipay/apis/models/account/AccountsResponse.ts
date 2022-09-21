import { AccountSourcesResponse } from "@/latipay/apis/models/accountSource/AccountSourcesResponse";

export interface AccountsResponse {

  id: number;
  accountName: string;
  accountNumber: string;
  availableBalance: number;
  branch: string;
  branchAddress: string;
  cnapsCode: string;

  cryptoNetwork: string;
  currency: string;
  enabled: boolean;
  remarks: string;
  routingCodes: string;
  source: AccountSourcesResponse;
  sourceId: number;
  swiftCode: string;
  ukeyExpiryDate: string;
  unavailableBalance: number;
  createdAt: string;
  updatedAt: string;
  description: string;

}


export class AddAccount {


  accountName = "";
  country = "";
  accountNumber = "";
  availableBalance = 0.00;
  branch = "";
  branchAddress = "";
  cnapsCode = "";
  type = "";
  cryptoNetwork = "";
  currency = "";
  enabled = true;
  remarks = "";
  routingCodes = "";
  sourceId = 0;
  swiftCode = "";
  ukeyExpiryDate = "";
  unavailableBalance = 0.00;
  createdAt = "";
  updatedAt =  "";
  description = "";

}
