import { AccountSourcesResponse } from "@/latipay/apis/models/accountSource/AccountSourcesResponse";
import { ManualOrdersResponse } from "@/latipay/apis/models/manualOrder/ManualOrdersResponse";

export interface AccountStatementsResponse {


  availableBalance: number;
  createdAt: string;
  id: number;
  operation: ManualOrdersResponse
  operationId: number;
  unavailableBalance: number;
  updatedAt: string;
  balanceType: string;
  accountId: number;
  currency: string;

}
