import { ref } from "vue";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import ApiService from "@/core/services/ApiService";

export const getListRequest = <Type>() => {
  const listRef = ref<Array<Type> | null | undefined>([]);
  const totalRef = ref(0);
  const pageNumberRef = ref(1);
  const pageSizeRef = ref(10);
  const responseRef = ref<AxiosResponse>();
  const errorRef = ref(null);
  const loadingRef = ref(false);

  const getList = async (
    needAuthHeader = true,
    path: string,
    params?: AxiosRequestConfig
  ) => {
    if (needAuthHeader) {
      ApiService.setHeader();
    }

    loadingRef.value = true;

    try {
      listRef.value = null;
      const result = await ApiService.get(path, params);
      responseRef.value = result;
      listRef.value = result.data && result.data.list ? result.data.list : [];
      totalRef.value = result.data && result.data.total ? result.data.total : 0;
      pageNumberRef.value =
        result.data && result.data.pageNumber ? result.data.pageNumber : 1;
      pageSizeRef.value =
        result.data && result.data.pageSize ? result.data.pageSize : 0;
    } catch (ex) {
      errorRef.value = ex.message;
    } finally {
      loadingRef.value = false;
    }

    loadingRef.value = false;
  };

  return {
    responseRef,
    errorRef,
    listRef,
    totalRef,
    pageNumberRef,
    pageSizeRef,
    loadingRef,
    getList,
  };
};

export const getDataRequest = <Type>() => {
  const dataRef = ref<Type | null | undefined>(null);
  const responseRef = ref<AxiosResponse>();
  const errorRef = ref(null);
  const loadingRef = ref(false);

  const getData = async (
    needAuthHeader = true,
    path: string,
    params?: AxiosRequestConfig
  ) => {
    if (needAuthHeader) {
      ApiService.setHeader();
    }

    loadingRef.value = true;

    try {
      dataRef.value = null;
      const result = await ApiService.get(path, params);
      responseRef.value = result;
      dataRef.value = result.data.data;
      console.log("11");
      console.log(result);
      console.log(result.data);
    } catch (ex) {
      errorRef.value = ex.message;
    } finally {
      loadingRef.value = false;
    }

    loadingRef.value = false;
  };

  return {
    responseRef,
    errorRef,
    dataRef,
    loadingRef,
    getData,
  };
};

export const patchDataRequest = <Type>() => {
  const responseRef = ref<AxiosResponse>();
  const patchErrorRef = ref(null);
  const dataRef = ref<Type | null | undefined>(null);

  const patchData = async (
    needAuthHeader = true,
    path: string,
    data?: unknown,
    params?: AxiosRequestConfig
  ) => {
    if (needAuthHeader) {
      ApiService.setHeader();
    }

    try {
      dataRef.value = null;
      const result = await ApiService.patch(path, data, params);
      responseRef.value = result;
      dataRef.value = result.data;
    } catch (ex) {
      patchErrorRef.value = ex.message;
    }
  };

  return {
    responseRef,
    patchErrorRef,
    dataRef,
    patchData,
  };
};


export const putDataRequest = <Type>() => {
  const responseRef = ref<AxiosResponse>();
  const putErrorRef = ref(null);
  const dataRef = ref<Type | null | undefined>(null);

  const putData = async (
    needAuthHeader = true,
    path: string,
    data?: unknown,
    params?: AxiosRequestConfig
  ) => {
    if (needAuthHeader) {
      ApiService.setHeader();
    }

    try {
      dataRef.value = null;
      const result = await ApiService.put(path, data, params);
      responseRef.value = result;
      dataRef.value = result.data;
    } catch (ex) {
      putErrorRef.value = ex.message;
    }
  };

  return {
    responseRef,
    putErrorRef,
    dataRef,
    putData,
  };
};

export const postDataRequest = <Type>() => {
  const responseRef = ref<AxiosResponse>();
  const postErrorRef = ref(null);
  const dataRef = ref<Type | null | undefined>(null);

  const postData = async (
    needAuthHeader = true,
    path: string,
    data?: unknown,
    params?: AxiosRequestConfig
  ) => {
    if (needAuthHeader) {
      ApiService.setHeader();
    }

    try {
      dataRef.value = null;
      const result = await ApiService.post(path, data, params);
      responseRef.value = result;
      dataRef.value = result.data;
    } catch (ex) {
      postErrorRef.value = ex.message;
    }
  };

  return {
    responseRef,
    postErrorRef,
    dataRef,
    postData,
  };
};

export const patchApproveDataRequest = <Type>() => {
  const responseRef = ref<AxiosResponse>();
  const approveErrorRef = ref(null);
  const dataRef = ref<Type | null | undefined>(null);

  const patchData = async (
    needAuthHeader = true,
    path: string,
    data?: unknown,
    params?: AxiosRequestConfig
  ) => {
    if (needAuthHeader) {
      ApiService.setHeader();
    }

    try {
      dataRef.value = null;
      const result = await ApiService.patch(path, data, params);
      responseRef.value = result;
      dataRef.value = result.data;
    } catch (ex) {
      approveErrorRef.value = ex.message;
    }
  };
};
