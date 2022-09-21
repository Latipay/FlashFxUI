import {AccountSourcesResponse} from "@/latipay/apis/models/accountSource/AccountSourcesResponse";

export interface SendFundResponse {

    success: boolean
    code: string
    message: string


}


export class AddSendFund {
    fromCurrency = ""
    toCurrency = ""
    amount = 0.00
    currency= ""
    quoteId = ""
    reason = ""
    sourceOfFunds = ""
    senderId = ""
    recipientId = ""
    externalReference = ""
    externalId = ""
    subClientId = ""
    callbackUri = ""
}
