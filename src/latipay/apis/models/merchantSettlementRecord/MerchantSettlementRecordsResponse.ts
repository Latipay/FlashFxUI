import { MerchantSettlementsResponse } from "@/latipay/apis/models/merchantSettlement/MerchantSettlementsResponse";


export interface MerchantSettlementRecordsResponse {


  accountAddress: string;
  accountBank: string;
  accountCountry: string;
  accountCrypto: string;
  accountCurrency: string;
  accountName: string;
  accountNetwork: string;
  accountNumber: string;
  accountType: string;
  createdAt: string;
  id: number;
  settlementAmount: number;
  settlementCurrency:string;
  settlements: MerchantSettlementsResponse
  type:string;
  updatedAt: string;

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
