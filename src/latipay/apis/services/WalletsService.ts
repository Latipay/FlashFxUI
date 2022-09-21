
import { ref } from "vue";
import { UsersResponse } from "@/latipay/apis/models/user/UsersResponse";
import { getDataRequest, getListRequest } from "@/latipay/apis/services/BaseService";
import { MerchantsResponse } from "@/latipay/apis/models/merchant/MerchantsResponse";
import { WalletsResponse } from "@/latipay/apis/models/wallet/WalletsResponse";

export const getWalletsRequest = () => {
  const {
    responseRef,
    errorRef,
    listRef,
    totalRef,
    pageNumberRef,
    pageSizeRef,
    getList,
  } = getListRequest<WalletsResponse>();
  const walletsRef = ref<
    Array<WalletsResponse> | null | undefined
    >([]);

  const getWallets = async (
    id: number,
    currency:string | null,
    sort: string | null,
    pageNumber: number,
    pageSize: number
  ) => {
    await getList(true, "/wallets", {
      params: {
        merchantId: id,
        currency:currency,
        sort: sort,
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    });
    console.log(listRef);
    walletsRef.value = listRef.value;
  };

  return {
    responseRef,
    errorRef,
    walletsRef,
    totalRef,
    pageNumberRef,
    pageSizeRef,
    getWallets,
  };
};


// export const getMerchantRequest = () => {
//   const { responseRef, errorRef, dataRef, getData } =
//     getDataRequest<MerchantsResponse>();
//   const merchantRef = ref<MerchantsResponse | null | undefined>(null);
//
//   const getMerchant = async (merchantId: number) => {
//     await getData(true, `/merchants/${merchantId}`);
//     merchantRef.value = dataRef.value;
//   };
//
//   return { responseRef, errorRef, merchantRef, getMerchant };
// };


