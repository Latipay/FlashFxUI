
import { ref } from "vue";
import { UsersResponse } from "@/latipay/apis/models/user/UsersResponse";
import { getDataRequest, getListRequest, postDataRequest, putDataRequest } from "@/latipay/apis/services/BaseService";
import { MerchantsResponse } from "@/latipay/apis/models/merchant/MerchantsResponse";
import { AccountSourcesResponse } from "@/latipay/apis/models/accountSource/AccountSourcesResponse";
import { AccountsResponse } from "@/latipay/apis/models/account/AccountsResponse";
import { MerchantSettlementsResponse } from "@/latipay/apis/models/merchantSettlement/MerchantSettlementsResponse";
import { MerchantSettlementRecordsResponse } from "@/latipay/apis/models/merchantSettlementRecord/MerchantSettlementRecordsResponse";

export const getMerchantSettlementRecordsRequest = () => {
  const {
    responseRef,
    errorRef,
    listRef,
    totalRef,
    pageNumberRef,
    pageSizeRef,
    getList,
  } = getListRequest<MerchantSettlementRecordsResponse>();
  const merchantSettlementRecordsRef = ref<
    Array<MerchantSettlementRecordsResponse> | null | undefined
    >([]);

  const getMerchantSettlementRecords = async (
    type: string | null,
    currency: string | null,
    accountType : string | null,
    accountName: string | null,
    accountNumber: string | null,
    sort: string | null,
    pageNumber: number,
    pageSize: number
  ) => {
    await getList(true, "/settlement-records", {
      params: {
        type: type,
        currency: currency,
        accountType:accountType,
        accountName: accountName,
        accountNumber:accountNumber,

        sort: sort,
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    });
    console.log(listRef);
    merchantSettlementRecordsRef.value = listRef.value;
  };

  return {
    responseRef,
    errorRef,
    merchantSettlementRecordsRef,
    totalRef,
    pageNumberRef,
    pageSizeRef,
    getMerchantSettlementRecords,
  };
};






