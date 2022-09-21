
import { ref } from "vue";
import { UsersResponse } from "@/latipay/apis/models/user/UsersResponse";
import { getDataRequest, getListRequest } from "@/latipay/apis/services/BaseService";
import { MerchantsResponse } from "@/latipay/apis/models/merchant/MerchantsResponse";

export const getMerchantsRequest = () => {
  const {
    responseRef,
    errorRef,
    listRef,
    totalRef,
    pageNumberRef,
    pageSizeRef,
    getList,
  } = getListRequest<MerchantsResponse>();
  const merchantsRef = ref<
    Array<MerchantsResponse> | null | undefined
    >([]);

  const getMerchants = async (
    id:string | null,
    slug: string | null,
    name: string | null,
    type: string | null,
    status: string | null,
    enabled: boolean | null,
    sort: string | null,
    pageNumber: number,
    pageSize: number
  ) => {
    await getList(true, "/merchants", {
      params: {
        id: id,
        slug:slug,
        name:name,
        type:type,
        status:status,
        enabled:enabled,
        sort: sort,
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    });
    console.log(listRef);
    merchantsRef.value = listRef.value;
  };

  return {
    responseRef,
    errorRef,
    merchantsRef,
    totalRef,
    pageNumberRef,
    pageSizeRef,
    getMerchants,
  };
};


export const getMerchantRequest = () => {
  const { responseRef, errorRef, dataRef, getData } =
    getDataRequest<MerchantsResponse>();
  const merchantRef = ref<MerchantsResponse | null | undefined>(null);

  const getMerchant = async (merchantId: number) => {
    await getData(true, `/merchants/${merchantId}`);
    merchantRef.value = dataRef.value;
  };

  return { responseRef, errorRef, merchantRef, getMerchant };
};


