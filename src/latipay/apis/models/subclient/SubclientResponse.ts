import {AccountSourcesResponse} from "@/latipay/apis/models/accountSource/AccountSourcesResponse";

export interface SubclientResponse {

    id: string
    fullName: string
    legalName: string
    tradingAsName: string
    clientType: string
    status: string
    primaryContact: PrimaryContact
    businessNumber: string;
    bsb: string;
    accountNo: string;
    address: AddressInfo
    postalAddress: AddressInfo
    idDoc: IdDoc
    externalId: string;
    fundingAccount : FundingAccount

}

export interface AddressInfo {

    country:string;
    postcode:string;
    state:string;
    street:string;
    suburb:string
    building: string

}
export interface PrimaryContact {

    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    mobile: string;
    dob: string;


}
export interface IdDoc {

    type: string
    docNumber: string
    issuer: string

}
export interface FundingAccount {

    name: string
    address: string
    iban: string
    accountNo: string
    accountName: string
    accountAddress: string
    bic: string
    currency: string
    externalReference: string

}
