import {AccountSourcesResponse} from "@/latipay/apis/models/accountSource/AccountSourcesResponse";

export interface SenderResponse {

    firstName: string;
    id: string;
    lastName: string;
    nickName: string;
    email: string;
    companyName:string;
    address: AddressInfo;

}

export interface AddressInfo {

    country:string;
    postcode:string;
    state:string;
    street:string;
    suburb:string



}
