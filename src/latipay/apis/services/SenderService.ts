
import { ref } from "vue";
import { UsersResponse } from "@/latipay/apis/models/user/UsersResponse";
import {getDataRequest, getListRequest, postDataRequest, putDataRequest} from "@/latipay/apis/services/BaseService";
import { MerchantsResponse } from "@/latipay/apis/models/merchant/MerchantsResponse";
import {AccountBalanceResponse} from "@/latipay/apis/models/accountBalance/AccountBalanceResponse";
import {SenderResponse} from "@/latipay/apis/models/sender/SenderResponse";






export const getSendersRequest = () => {
  const {
    responseRef,
    errorRef,
    listRef,
    totalRef,
    pageNumberRef,
    pageSizeRef,
    getList,
  } = getListRequest<SenderResponse>();
  const getSendersRef = ref<
      Array<SenderResponse> | null | undefined
      >([]);

  const getSenders = async (

      sort: string | null,
      pageNumber: number,
      pageSize: number

  ) => {
    await getList(true, "/senders", {
      params: {
        sort: sort,
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    });
    console.log(listRef);
    getSendersRef.value = listRef.value;
  };

  return {
    responseRef,
    errorRef,
    getSendersRef,
    totalRef,
    pageNumberRef,
    pageSizeRef,
    getSenders,
  };
};


