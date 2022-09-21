import { AccountsResponse } from "@/latipay/apis/models/account/AccountsResponse";
import { UsersResponse } from "@/latipay/apis/models/user/UsersResponse";

export interface ManualOrdersResponse {


  accountFrom: AccountsResponse;
  accountFromId:  number;
  accountTo: AccountsResponse;
  accountToId:  number;
  amountFrom:  number;
  amountTo:  number;
  approvedBy: UsersResponse;
  approvedById:  number;
  balanceTypeFrom: string;
  balanceTypeTo: string;

  createdAt: string;
  currencyFrom: string;
  currencyTo: string;
  id: number;
  enabled: boolean;
  comment:string;
  remarks:string;
  conversionRate: ConversionRate;
}


export class AddIncreaseManualOrder {

  accountToId = 0;
  orderType = "";
  tag = "";
  balanceTypeTo = "";
  amountTo=0.00;
  currencyTo= "";
  remarks= "";
  comment = "";
  type = "";

}

export class AddDecreaseManualOrder {

  accountFromId = 0;
  orderType = "";
  tag = "";
  balanceTypeFrom = "Available";
  amountFrom=0.00;
  currencyFrom= "";
  comment = "";
  type = "";
  remarks= "";

}

export class AddTransferManualOrder {

  accountFromId = 0;
  accountToId = 0;
  orderType = "";
  tag = "";
  balanceTypeFrom = "";
  balanceTypeTo = "";
  amountFrom=0.00;
  amountTo=0.00;
  currencyFrom= "";
  currencyTo= "";
  comment = "";
  remarks= "";
  type = "";
  conversionRate = "";

}

export class ConversionRate {

  currency = '';
  rate = 0;
}

export class ApproveManualOrder {

  amountTo = 0.00;
  conversionRate = "";
  remarks = "";

}

export class RejectManualOrder {


  remarks = "";
  amountTo = 0.00;
}



