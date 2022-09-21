import { AccountSourcesResponse } from "@/latipay/apis/models/accountSource/AccountSourcesResponse";
import { TransactionsResponse } from "@/latipay/apis/models/transaction/TransactionsResponse";
import { MerchantsResponse } from "@/latipay/apis/models/merchant/MerchantsResponse";
import { WalletsResponse } from "@/latipay/apis/models/wallet/WalletsResponse";

export interface WalletStatementsResponse {

  amount: number;
  availableBalance: number;
  balanceType: string;
  createdAt: string;
  currency: string;
  id: number;
  merchant: MerchantsResponse;
  merchantId: number;
  source: string;
  transaction: TransactionsResponse;
  transactionId: number;
  type: string;
  unavailableBalance: number;
  wallet: WalletsResponse;
  walletId: number;
  remarks:string;

}

export class PostWalletParameter {
  merchantId = 0;
  walletId= 0;
  amount = 0;
  balanceType = "";
  remarks = "";
}


