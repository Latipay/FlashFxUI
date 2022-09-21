import {AccountSourcesResponse} from "@/latipay/apis/models/accountSource/AccountSourcesResponse";

export interface AccountBalanceResponse {

    currency: string;
    cleared: number;
    pending: number;


}

