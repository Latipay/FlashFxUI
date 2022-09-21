
import { ref } from "vue";
import { UsersResponse } from "@/latipay/apis/models/user/UsersResponse";
import { getDataRequest, getListRequest, postDataRequest, putDataRequest } from "@/latipay/apis/services/BaseService";
import { MerchantsResponse } from "@/latipay/apis/models/merchant/MerchantsResponse";
import { AccountSourcesResponse } from "@/latipay/apis/models/accountSource/AccountSourcesResponse";
import { AccountsResponse } from "@/latipay/apis/models/account/AccountsResponse";

export const getAccountsRequest = () => {
  const {
    responseRef,
    errorRef,
    listRef,
    totalRef,
    pageNumberRef,
    pageSizeRef,
    getList,
  } = getListRequest<AccountsResponse>();
  const accountsRef = ref<
    Array<AccountsResponse> | null | undefined
    >([]);

  const getAccounts = async (
    type: string | null,
    country: string | null,
    sourceName : string | null,
    currency: string | null,
    accountName: string | null,
    accountNumber: string | null,
    sort: string | null,
    pageNumber: number,
    pageSize: number
  ) => {
    await getList(true, "/system-accounts", {
      params: {
        type: type,
        country: country,
        sourceName:sourceName,
        currency: currency,
        accountName: accountName,
        accountNumber:accountNumber,

        sort: sort,
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    });
    console.log(listRef);
    accountsRef.value = listRef.value;
  };

  return {
    responseRef,
    errorRef,
    accountsRef,
    totalRef,
    pageNumberRef,
    pageSizeRef,
    getAccounts,
  };
};


export const getAccountRequest = () => {
  const { responseRef, errorRef, dataRef, getData } =
    getDataRequest<AccountsResponse>();
  const accountRef = ref<AccountsResponse | null | undefined>(null);

  const getAccountRef = async (accountId: number) => {
    await getData(true, `/system-accounts/${accountId}`);
    accountRef.value = dataRef.value;
    console.log(dataRef.value);
  };

  return { responseRef, errorRef, accountRef, getAccountRef };
};

export const putAccoutRequest = () => {
  const { responseRef, putErrorRef, dataRef, putData } =
    putDataRequest<AccountsResponse>();
  const putAccountRef = ref<AccountsResponse | null | undefined>(null);

  const putAccount = async (accountId: number, data: AccountsResponse) => {
    await putData(true, `/system-accounts/${accountId}`, data);
    putAccountRef.value = dataRef.value;
    console.log(dataRef.value);
  };

  return { responseRef, putErrorRef, putAccountRef, putAccount };
};

export const postAccountRequest = () => {
  const { responseRef, postErrorRef, dataRef, postData } =
    postDataRequest<AccountsResponse>();
  const postAccountRef = ref<AccountsResponse | null | undefined>(null);

  const postAccount  = async ( data: AccountsResponse) => {
    await postData(true, `/system-accounts`, data);
    postAccountRef.value = dataRef.value;
    console.log(dataRef.value);
  };

  return { responseRef, postErrorRef,  postAccountRef, postAccount };
};



