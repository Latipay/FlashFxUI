
import { ref } from "vue";
import { UsersResponse } from "@/latipay/apis/models/user/UsersResponse";
import { getDataRequest, getListRequest, putDataRequest } from "@/latipay/apis/services/BaseService";
import { MerchantsResponse } from "@/latipay/apis/models/merchant/MerchantsResponse";

export const getUsersRequest = () => {
  const {
    responseRef,
    errorRef,
    listRef,
    totalRef,
    pageNumberRef,
    pageSizeRef,
    getList,
  } = getListRequest<UsersResponse>();
  const usersRef = ref<
    Array<UsersResponse> | null | undefined
    >([]);

  const getUsers = async (
    name: string | null,
    email: string | null,
    status: string | null,
    sort: string | null,
    pageNumber: number,
    pageSize: number
  ) => {
    await getList(true, "/administrators", {
      params: {
        name: name,
        sort: sort,
        email:email,
        status:status,
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    });
    console.log(listRef);
    usersRef.value = listRef.value;
  };

  return {
    responseRef,
    errorRef,
    usersRef,
    totalRef,
    pageNumberRef,
    pageSizeRef,
    getUsers,
  };
};


export const getUserRequest = () => {
  const { responseRef, errorRef, dataRef, getData } =
    getDataRequest<UsersResponse>();
  const userRef = ref<UsersResponse | null | undefined>(null);

  const getUser = async (userId: number) => {
    await getData(true, `/administrators/${userId}`);
    userRef.value = dataRef.value;
    console.log(dataRef.value);
  };

  return { responseRef, errorRef, userRef, getUser };
};

export const putUserRequest = () => {
  const { responseRef, putErrorRef, dataRef, putData } =
    putDataRequest<UsersResponse>();
  const putUserRef = ref<UsersResponse | null | undefined>(null);

  const putUser = async (userId: number, data: UsersResponse) => {
    await putData(true, `/administrators/${userId}`, data);
    putUserRef.value = dataRef.value;
    console.log(dataRef.value);
  };

  return { responseRef, putErrorRef, putUserRef, putUser };
};



