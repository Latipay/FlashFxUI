
import { ref } from "vue";
import { UsersResponse } from "@/latipay/apis/models/user/UsersResponse";
import {getDataRequest, getListRequest, postDataRequest, putDataRequest} from "@/latipay/apis/services/BaseService";
import { MerchantsResponse } from "@/latipay/apis/models/merchant/MerchantsResponse";
import {AccountBalanceResponse} from "@/latipay/apis/models/accountBalance/AccountBalanceResponse";
import {SenderResponse} from "@/latipay/apis/models/sender/SenderResponse";
import {RecipientResponse} from "@/latipay/apis/models/recipient/RecipientResponse";






export const getRecipientsRequest = () => {
  const {
    responseRef,
    errorRef,
    listRef,
    totalRef,
    pageNumberRef,
    pageSizeRef,
    getList,
  } = getListRequest<RecipientResponse>();
  const getRecipientsRef = ref<
      Array<RecipientResponse> | null | undefined
      >([]);

  const getRecipients = async (

      sort: string | null,
      pageNumber: number,
      pageSize: number

  ) => {
    await getList(true, "/recipients", {
      params: {
        sort: sort,
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    });
    console.log(listRef);
    getRecipientsRef.value = listRef.value;
  };

  return {
    responseRef,
    errorRef,
    getRecipientsRef,
    totalRef,
    pageNumberRef,
    pageSizeRef,
    getRecipients,
  };
};


