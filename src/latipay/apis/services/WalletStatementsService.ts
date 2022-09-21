
import { ref } from "vue";
import { UsersResponse } from "@/latipay/apis/models/user/UsersResponse";
import {
  getDataRequest,
  getListRequest, patchApproveDataRequest,
  patchDataRequest,
  postDataRequest,
  putDataRequest
} from "@/latipay/apis/services/BaseService";
import { MerchantsResponse } from "@/latipay/apis/models/merchant/MerchantsResponse";
import { TransactionsResponse } from "@/latipay/apis/models/transaction/TransactionsResponse";
import { ApproveManualOrder, ManualOrdersResponse } from "@/latipay/apis/models/manualOrder/ManualOrdersResponse";
import { AccountsResponse } from "@/latipay/apis/models/account/AccountsResponse";
import {
  PostWalletParameter,
  WalletStatementsResponse
} from "@/latipay/apis/models/walletStatement/WalletStatementsResponse";

export const getWalletStatementsRequest = () => {
  const {
    responseRef,
    errorRef,
    listRef,
    totalRef,
    pageNumberRef,
    pageSizeRef,
    getList,
  } = getListRequest<WalletStatementsResponse>();
  const walletStatementsRef = ref<
    Array<WalletStatementsResponse> | null | undefined
    >([]);



  const getWalletStatements = async (
    merchantId:string | null,
    walletId:string | null,
    type:string | null,
    currency:string | null,
    sort: string | null,
    pageNumber: number,
    pageSize: number
  ) => {
    await getList(true, "/wallet-operations", {
      params: {
        merchantId:merchantId,
        walletId:walletId,
        type:type,
        currency:currency,
        sort:sort,
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    });
    console.log(listRef);
    walletStatementsRef.value = listRef.value;
  };

  return {
    responseRef,
    errorRef,
    walletStatementsRef,
    totalRef,
    pageNumberRef,
    pageSizeRef,
    getWalletStatements,
  };
};


export const postWalletStatementRequest = () => {
  const { responseRef, postErrorRef, dataRef, postData } =
    postDataRequest<WalletStatementsResponse>();
  const postWalletStatementRef = ref<WalletStatementsResponse | null | undefined>(null);

  const postWalletStatement  = async ( data: PostWalletParameter) => {
    await postData(true, `/wallet-operations`, data);
    postWalletStatementRef.value = dataRef.value;
    console.log(dataRef.value);
  };

  return { responseRef, postErrorRef,  postWalletStatementRef, postWalletStatement };
};






