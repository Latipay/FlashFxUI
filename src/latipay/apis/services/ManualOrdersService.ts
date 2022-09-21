
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

export const getManualOrdersRequest = () => {
  const {
    responseRef,
    errorRef,
    listRef,
    totalRef,
    pageNumberRef,
    pageSizeRef,
    getList,
  } = getListRequest<ManualOrdersResponse>();
  const manualOrdersRef = ref<
    Array<ManualOrdersResponse> | null | undefined
    >([]);



  const getManualOrders = async (
    accountFromId:string | null,
    accountToId:string | null,
    type:string | null,
    sort: string | null,
    pageNumber: number,
    pageSize: number
  ) => {
    await getList(true, "/system-account-operations", {
      params: {
        accountFromId:accountFromId,
        accountToId:accountToId,
        type:type,
        sort:sort,
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    });
    console.log(listRef);
    manualOrdersRef.value = listRef.value;
  };

  return {
    responseRef,
    errorRef,
    manualOrdersRef,
    totalRef,
    pageNumberRef,
    pageSizeRef,
    getManualOrders,
  };
};


export const postManualOrderRequest = () => {
  const { responseRef, postErrorRef, dataRef, postData } =
    postDataRequest<ManualOrdersResponse>();
  const postManualOrderRef = ref<ManualOrdersResponse | null | undefined>(null);

  const postManualOrder  = async ( data: ManualOrdersResponse) => {
    await postData(true, `/system-account-operations`, data);
    postManualOrderRef.value = dataRef.value;
    console.log(dataRef.value);
  };

  return { responseRef, postErrorRef,  postManualOrderRef, postManualOrder };
};


export const approveManualOrderRequest = () => {
  const { responseRef, patchErrorRef, dataRef, patchData } =
    patchDataRequest<ManualOrdersResponse>();
  const patchManualOrderRef = ref<ManualOrdersResponse | null | undefined>(null);

  const approveManualOrder = async (orderId: number, data: ManualOrdersResponse) => {
    await patchData(true, `/system-account-operations/${orderId}/approve`, data);
    patchManualOrderRef.value = dataRef.value;
    console.log(dataRef.value);
  };

  return { responseRef, patchErrorRef, patchManualOrderRef, approveManualOrder };
};

export const rejectManualOrderRequest = () => {
  const { responseRef, patchErrorRef, dataRef, patchData } =
    patchDataRequest<ManualOrdersResponse>();
  const patchManualOrderRef = ref<ManualOrdersResponse | null | undefined>(null);

  const rejectManualOrder = async (orderId: number, data: ManualOrdersResponse) => {
    await patchData(true, `/system-account-operations/${orderId}/cancel`, data);
    patchManualOrderRef.value = dataRef.value;
    console.log(dataRef.value);
  };

  return { responseRef, patchErrorRef, patchManualOrderRef, rejectManualOrder };
};




