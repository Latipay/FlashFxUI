
import { ref } from "vue";
import { UsersResponse } from "@/latipay/apis/models/user/UsersResponse";
import {getDataRequest, getListRequest, postDataRequest, putDataRequest} from "@/latipay/apis/services/BaseService";
import { MerchantsResponse } from "@/latipay/apis/models/merchant/MerchantsResponse";
import {AccountBalanceResponse} from "@/latipay/apis/models/accountBalance/AccountBalanceResponse";
import {SenderResponse} from "@/latipay/apis/models/sender/SenderResponse";
import {SubclientResponse} from "@/latipay/apis/models/subclient/SubclientResponse";






export const getSubclientRequest = () => {
  const {
    responseRef,
    errorRef,
    listRef,
    totalRef,
    pageNumberRef,
    pageSizeRef,
    getList,
  } = getListRequest<SubclientResponse>();
  const getSubclientsRef = ref<
      Array<SubclientResponse> | null | undefined
      >([]);

  const getSubclients = async (

      sort: string | null,
      pageNumber: number,
      pageSize: number

  ) => {
    await getList(true, "/sub-clients", {
      params: {
        sort: sort,
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    });
    console.log(listRef);
    getSubclientsRef.value = listRef.value;
  };

  return {
    responseRef,
    errorRef,
    getSubclientsRef,
    totalRef,
    pageNumberRef,
    pageSizeRef,
    getSubclients,
  };
};


