import { ConversionRate } from "@/latipay/apis/models/manualOrder/ManualOrdersResponse";
import { MerchantsResponse } from "@/latipay/apis/models/merchant/MerchantsResponse";
import { MerchantSettlementRecordsResponse } from "@/latipay/apis/models/merchantSettlementRecord/MerchantSettlementRecordsResponse";
import { WalletsResponse } from "@/latipay/apis/models/wallet/WalletsResponse";


export interface MerchantSettlementsResponse {



  accountAddress: string;
  accountBank: string;
  accountCountry: string;
  accountCrypto: string;
  accountCurrency: string;
  accountName: string;
  accountNetwork: string;
  accountNumber: string;
  accountType: string;
  conversionRate: ConversionRate;
  createdAt: string;
  failureReason: string;
  fee: number;
  id: number;
  merchant: MerchantsResponse;
  merchantId: number;
  record: MerchantSettlementRecordsResponse
  recordId: number;
  reference: string;
  settlementAmount: number;
  settlementCurrency: string;
  slug: string;
  status: string;
  type:string;
  updatedAt: string;
  wallet: WalletsResponse
  walletId: number;
  withdrawalAmount: number;

}

export class ApproveMerchantSettlement {

  settlementAmount = 0.00;
  conversionRate = "";
  systemAccountId = 0;

}
export class RejectMerchantSettlement {


  failureReason = "";


}
