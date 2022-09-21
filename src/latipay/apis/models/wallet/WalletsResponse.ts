import { MerchantsResponse } from "@/latipay/apis/models/merchant/MerchantsResponse";

export interface WalletsResponse {


  availableBalance: number;
  createdAt: string;
  currency: string;
  collectionCurrencies: string[];
  settlementCurrencies: string[];
  enabled: boolean;
  gateways: string[];

  id: number;
  merchant: MerchantsResponse;
  merchantId: number;
  name: string;
  slug: string;
  unavailableBalance: number;
  updatedAt: string;

}

// export class AdjustWallet {
//   availableBalance = 0;
//   createdAt = "";
//   currency = "";
//   enabled = true;
//   id = 0;
//   merchantId = 0;
//   name = "";
//   slug = "";
//   unavailableBalance = 0;
//   updatedAt = "";
//
// }
