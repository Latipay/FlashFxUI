import { MerchantsResponse } from "@/latipay/apis/models/merchant/MerchantsResponse";
import { WalletsResponse } from "@/latipay/apis/models/wallet/WalletsResponse";

export interface TransactionsResponse {

  id: number;
  amountFrom: number;
  amountPaid: number;
  amountTo: number;
  channel: string;
  currencyFrom: string;
  currencyPaid: string;
  currencyTo: string;
  gateway: string;
  walletId: number;
  merchantId: number;
  reference: string;
  slug: string;
  status: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  returnUrl: string;
  callbackUrl: string;
  merchant: MerchantsResponse;
  wallet: WalletsResponse

}
