import {AccountSourcesResponse} from "@/latipay/apis/models/accountSource/AccountSourcesResponse";

export interface RecipientResponse {



    id: string
    nickName: string
    firstName: string
    middleName: string
    lastName: string
    dob: string
    companyName: string
    accountName: string
    email: string
    mobile: string
    address: RAddressInfo
    accountIdType: string
    phCashoutNetwork: string
    payid: string
    bic: string
    iban: string
    aba: string
    bsb: string
    clabe: string
    cnaps: string
    ifsc: string
    sortCode: string
    accountNo: string
    rippleAddress: string
    destTag: number
    country: string
    currency: string
    externalId: string

}

export interface RAddressInfo {



    building: string
    street: string
    suburb: string
    state: string
    country: string
    postcode: string



}
