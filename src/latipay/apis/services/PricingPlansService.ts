
import { ref } from "vue";
import { UsersResponse } from "@/latipay/apis/models/user/UsersResponse";
import { getDataRequest, getListRequest, putDataRequest } from "@/latipay/apis/services/BaseService";
import { MerchantsResponse } from "@/latipay/apis/models/merchant/MerchantsResponse";
import { TransactionsResponse } from "@/latipay/apis/models/transaction/TransactionsResponse";
import { LatipayChannelsResponse } from "@/latipay/apis/models/latipayChannel/LatipayChannelsResponse";
import { PricingPlansResponse } from "@/latipay/apis/models/pricingPlan/PrcingPlansResponse";

export const getPricingPlansRequest = () => {
  const {
    responseRef,
    errorRef,
    listRef,
    totalRef,
    pageNumberRef,
    pageSizeRef,
    getList,
  } = getListRequest<PricingPlansResponse>();
  const pricingPlansRef = ref<
    Array<PricingPlansResponse> | null | undefined
    >([]);



  const getPricingPlans = async (
    walletId:string | null,
    merchantId: string | null,
    gatewayName: string | null,
    channelName: string | null,
    sort: string | null,
    pageNumber: number,
    pageSize: number
  ) => {
    await getList(true, "/pricings", {
      params: {
        walletId:walletId,
        merchantId:merchantId,
        gatewayName:gatewayName,
        channelName:channelName,
        sort:sort,
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    });
    console.log(listRef);
    pricingPlansRef.value = listRef.value;
  };

  return {
    responseRef,
    errorRef,
    pricingPlansRef,
    totalRef,
    pageNumberRef,
    pageSizeRef,
    getPricingPlans,
  };
};






