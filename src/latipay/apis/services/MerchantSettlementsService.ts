
import { ref } from "vue";
import { UsersResponse } from "@/latipay/apis/models/user/UsersResponse";
import {
  getDataRequest,
  getListRequest,
  patchDataRequest,
  postDataRequest,
  putDataRequest
} from "@/latipay/apis/services/BaseService";
import { MerchantsResponse } from "@/latipay/apis/models/merchant/MerchantsResponse";
import { AccountSourcesResponse } from "@/latipay/apis/models/accountSource/AccountSourcesResponse";
import { AccountsResponse } from "@/latipay/apis/models/account/AccountsResponse";
import {
  ApproveMerchantSettlement,
  MerchantSettlementsResponse, RejectMerchantSettlement
} from "@/latipay/apis/models/merchantSettlement/MerchantSettlementsResponse";
import { ManualOrdersResponse } from "@/latipay/apis/models/manualOrder/ManualOrdersResponse";

export const getMerchantSettlementsRequest = () => {
  const {
    responseRef,
    errorRef,
    listRef,
    totalRef,
    pageNumberRef,
    pageSizeRef,
    getList,
  } = getListRequest<MerchantSettlementsResponse>();
  const merchantSettlementsRef = ref<
    Array<MerchantSettlementsResponse> | null | undefined
    >([]);

  const getMerchantSettlements = async (
    id: string | null,
    merchantId: string | null,
    walletId : string | null,
    accountName: string | null,
    accountNumber: string | null,
    settlementCurrency: string | null,
    status: string | null,
    sort: string | null,
    pageNumber: number,
    pageSize: number
  ) => {
    await getList(true, "/settlements", {
      params: {
        id: id,
        merchantId: merchantId,
        walletId:walletId,
        accountName: accountName,
        accountNumber:accountNumber,
        settlementCurrency:settlementCurrency,
        status:status,

        sort: sort,
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    });
    console.log(listRef);
    merchantSettlementsRef.value = listRef.value;
  };

  return {
    responseRef,
    errorRef,
    merchantSettlementsRef,
    totalRef,
    pageNumberRef,
    pageSizeRef,
    getMerchantSettlements,
  };
};

export const approveMerchantSettlementRequest = () => {
  const { responseRef, patchErrorRef, dataRef, patchData } =
    patchDataRequest<ApproveMerchantSettlement>();
  const patchManualOrderRef = ref<ApproveMerchantSettlement | null | undefined>(null);

  const approveMerchantSettlement = async (orderId: number, data: ApproveMerchantSettlement) => {
    await patchData(true, `/settlements/${orderId}/approve`, data);
    patchManualOrderRef.value = dataRef.value;
    console.log(dataRef.value);
  };

  return { responseRef, patchErrorRef, patchManualOrderRef, approveMerchantSettlement };
};

export const rejectMerchantSettlementRequest = () => {
  const { responseRef, patchErrorRef, dataRef, patchData } =
    patchDataRequest<RejectMerchantSettlement>();
  const patchManualOrderRef = ref<RejectMerchantSettlement | null | undefined>(null);

  const rejectMerchantSettlement= async (orderId: number, data: RejectMerchantSettlement) => {
    await patchData(true, `/settlements/${orderId}/reject`, data);
    patchManualOrderRef.value = dataRef.value;
    console.log(dataRef.value);
  };

  return { responseRef, patchErrorRef, patchManualOrderRef, rejectMerchantSettlement };
};




