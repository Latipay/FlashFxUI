
import { ref } from "vue";
import { UsersResponse } from "@/latipay/apis/models/user/UsersResponse";
import {getDataRequest, getListRequest, postDataRequest, putDataRequest} from "@/latipay/apis/services/BaseService";
import { MerchantsResponse } from "@/latipay/apis/models/merchant/MerchantsResponse";
import {AccountBalanceResponse} from "@/latipay/apis/models/accountBalance/AccountBalanceResponse";






export const getAccountBalanceRequest = () => {
  const {
    responseRef,
    errorRef,
    listRef,
    totalRef,
    pageNumberRef,
    pageSizeRef,
    getList,
  } = getListRequest<AccountBalanceResponse>();
  const getAccountBalanceRef = ref<
      Array<AccountBalanceResponse> | null | undefined
      >([]);

  const getAccountBalance = async (

  ) => {
    await getList(true, "/balances?currency=AUD", {
      params: {
      },
    });
    console.log(listRef);
    getAccountBalanceRef.value = listRef.value;
  };

  return {
    responseRef,
    errorRef,
    getAccountBalanceRef,
    totalRef,
    pageNumberRef,
    pageSizeRef,
    getAccountBalance,
  };
};


