
import { ref } from "vue";
import { UsersResponse } from "@/latipay/apis/models/user/UsersResponse";
import { getDataRequest, getListRequest, putDataRequest } from "@/latipay/apis/services/BaseService";
import { MerchantsResponse } from "@/latipay/apis/models/merchant/MerchantsResponse";
import { TransactionsResponse } from "@/latipay/apis/models/transaction/TransactionsResponse";

export const getTransactionsRequest = () => {
  const {
    responseRef,
    errorRef,
    listRef,
    totalRef,
    pageNumberRef,
    pageSizeRef,
    getList,
  } = getListRequest<TransactionsResponse>();
  const transactionsRef = ref<
    Array<TransactionsResponse> | null | undefined
    >([]);



  const getTransactions = async (
    id:string | null,
    merchantId:string | null,
    walletId: string | null,
    type: string | null,
    gateway : string | null,
    channel : string | null,
    currencyFrom :  string | null,
    currencyTo  :  string | null,
    status: string | null,
    sort: string | null,
    pageNumber: number,
    pageSize: number
  ) => {
    await getList(true, "/transactions", {
      params: {
        id:id,
        merchantId:merchantId,
        walletId: walletId,
        type: type,
        gateway : gateway,
        channel : channel,
        currencyFrom :  currencyFrom,
        currencyTo  :  currencyTo,
        status:status,
        sort:sort,
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    });
    console.log(listRef);
    transactionsRef.value = listRef.value;
  };

  return {
    responseRef,
    errorRef,
    transactionsRef,
    totalRef,
    pageNumberRef,
    pageSizeRef,
    getTransactions,
  };
};






