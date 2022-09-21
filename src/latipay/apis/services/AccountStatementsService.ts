
import { ref } from "vue";
import { UsersResponse } from "@/latipay/apis/models/user/UsersResponse";
import { getDataRequest, getListRequest, postDataRequest, putDataRequest } from "@/latipay/apis/services/BaseService";
import { MerchantsResponse } from "@/latipay/apis/models/merchant/MerchantsResponse";
import { AccountSourcesResponse } from "@/latipay/apis/models/accountSource/AccountSourcesResponse";
import { AccountsResponse } from "@/latipay/apis/models/account/AccountsResponse";
import { AccountStatementsResponse } from "@/latipay/apis/models/accountStatement/AccountStatementsResponse";

export const getAccountStatementsRequest = () => {
  const {
    responseRef,
    errorRef,
    listRef,
    totalRef,
    pageNumberRef,
    pageSizeRef,
    getList,
  } = getListRequest<AccountStatementsResponse>();
  const accountStatementsRef = ref<
    Array<AccountStatementsResponse> | null | undefined
    >([]);

  const getAccountStatements = async (
    operationId: string | null,
    accountFromId: string | null,
    accountToId : string | null,

    sort: string | null,
    pageNumber: number,
    pageSize: number
  ) => {
    await getList(true, "/system-account-statements", {
      params: {
        operationId: operationId,
        accountFromId: accountFromId,
        accountToId:accountToId,


        sort: sort,
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    });
    console.log(listRef);
    accountStatementsRef.value = listRef.value;
  };

  return {
    responseRef,
    errorRef,
    accountStatementsRef,
    totalRef,
    pageNumberRef,
    pageSizeRef,
    getAccountStatements,
  };
};





