
import { ref } from "vue";
import { UsersResponse } from "@/latipay/apis/models/user/UsersResponse";
import { getDataRequest, getListRequest, postDataRequest, putDataRequest } from "@/latipay/apis/services/BaseService";
import { MerchantsResponse } from "@/latipay/apis/models/merchant/MerchantsResponse";
import { AccountSourcesResponse } from "@/latipay/apis/models/accountSource/AccountSourcesResponse";
import {AddSendFund, SendFundResponse} from "@/latipay/apis/models/sendFund/SendFundResponse";





export const postSendFundRequest = () => {
  const { responseRef, postErrorRef, dataRef, postData } =
    postDataRequest<SendFundResponse>();
  const postSendFundRef = ref<SendFundResponse | null | undefined>(null);

  const postSendFund  = async ( data: AddSendFund) => {
    await postData(true, `/payments`, data);
    postSendFundRef.value = dataRef.value;
    console.log(dataRef.value);
  };

  return { responseRef, postErrorRef,  postSendFundRef, postSendFund };
};



