import {AccountSourcesResponse} from "@/latipay/apis/models/accountSource/AccountSourcesResponse";

export interface QuoteResponse {



    ask: number
    bid: number
    dateTime: string
    fee: number
    fromAmount: number
    id: string
    inverted: boolean
    savingsAmount: number
    savingsCurrency: string
    symbol: string
    toAmount: number
    totalMgnAsk: number
    totalMgnBid: number


}

