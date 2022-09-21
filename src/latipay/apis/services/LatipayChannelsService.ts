
import { ref } from "vue";
import { UsersResponse } from "@/latipay/apis/models/user/UsersResponse";
import { getDataRequest, getListRequest, putDataRequest } from "@/latipay/apis/services/BaseService";
import { MerchantsResponse } from "@/latipay/apis/models/merchant/MerchantsResponse";
import { TransactionsResponse } from "@/latipay/apis/models/transaction/TransactionsResponse";
import { LatipayChannelsResponse } from "@/latipay/apis/models/latipayChannel/LatipayChannelsResponse";

export const getLatipayChannelsRequest = () => {
  const {
    responseRef,
    errorRef,
    listRef,
    totalRef,
    pageNumberRef,
    pageSizeRef,
    getList,
  } = getListRequest<LatipayChannelsResponse>();
  const latipayChannelsRef = ref<
    Array<LatipayChannelsResponse> | null | undefined
    >([]);



  const getLatipayChannels = async (
    gatewayName:string | null,
    channelName: string | null,
    sort: string | null,
    pageNumber: number,
    pageSize: number
  ) => {
    await getList(true, "/gateway-configurations", {
      params: {
        gatewayName:gatewayName,
        channelName:channelName,
        sort:sort,
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    });
    console.log(listRef);
    latipayChannelsRef.value = listRef.value;
  };

  return {
    responseRef,
    errorRef,
    latipayChannelsRef,
    totalRef,
    pageNumberRef,
    pageSizeRef,
    getLatipayChannels,
  };
};






