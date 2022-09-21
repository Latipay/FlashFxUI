
import { ref } from "vue";
import { UsersResponse } from "@/latipay/apis/models/user/UsersResponse";
import { getDataRequest, getListRequest, postDataRequest, putDataRequest } from "@/latipay/apis/services/BaseService";
import { MerchantsResponse } from "@/latipay/apis/models/merchant/MerchantsResponse";
import { AccountSourcesResponse } from "@/latipay/apis/models/accountSource/AccountSourcesResponse";

export const getAccountSourcesRequest = () => {
  const {
    responseRef,
    errorRef,
    listRef,
    totalRef,
    pageNumberRef,
    pageSizeRef,
    getList,
  } = getListRequest<AccountSourcesResponse>();
  const accountSourcesRef = ref<
    Array<AccountSourcesResponse> | null | undefined
    >([]);

  const getAccountSources = async (
    type: string | null,
    region: string | null,
    country: string | null,
    name : string | null,
    sort: string | null,
    pageNumber: number,
    pageSize: number
  ) => {
    await getList(true, "/system-account-sources", {
      params: {
        type: type,
        region: region,
        country:country,
        name: name,
        sort: sort,
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    });
    console.log(listRef);
    accountSourcesRef.value = listRef.value;
  };

  return {
    responseRef,
    errorRef,
    accountSourcesRef,
    totalRef,
    pageNumberRef,
    pageSizeRef,
    getAccountSources,
  };
};


export const getAccountSourceRequest = () => {
  const { responseRef, errorRef, dataRef, getData } =
    getDataRequest<AccountSourcesResponse>();
  const accountSourceRef = ref<AccountSourcesResponse | null | undefined>(null);

  const getAccountSource = async (accountSourceId: number) => {
    await getData(true, `/system-account-sources/${accountSourceId}`);
    accountSourceRef.value = dataRef.value;
    console.log(dataRef.value);
  };

  return { responseRef, errorRef, accountSourceRef, getAccountSource };
};

export const putAccoutSourceRequest = () => {
  const { responseRef, putErrorRef, dataRef, putData } =
    putDataRequest<AccountSourcesResponse>();
  const putAccountSourceRef = ref<AccountSourcesResponse | null | undefined>(null);

  const putAccountSource = async (accountSourceId: number, data: AccountSourcesResponse) => {
    await putData(true, `/system-account-sources/${accountSourceId}`, data);
    putAccountSourceRef.value = dataRef.value;
    console.log(dataRef.value);
  };

  return { responseRef, putErrorRef, putAccountSourceRef, putAccountSource };
};

export const postAccountSourceRequest = () => {
  const { responseRef, postErrorRef, dataRef, postData } =
    postDataRequest<AccountSourcesResponse>();
  const postAccountSourceRef = ref<AccountSourcesResponse | null | undefined>(null);

  const postAccountSource  = async ( data: AccountSourcesResponse) => {
    await postData(true, `/system-account-sources`, data);
    postAccountSourceRef.value = dataRef.value;
    console.log(dataRef.value);
  };

  return { responseRef, postErrorRef,  postAccountSourceRef, postAccountSource };
};



