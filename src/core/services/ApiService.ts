import { App } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/core/services/JwtService";
import { AxiosResponse, AxiosRequestConfig } from "axios";
import store from "@/store/";
import router from "@/router";
import { Actions } from "@/store/enums/StoreEnums";

/**
 * @description service to call HTTP request via Axios
 */
class ApiService {
  /**
   * @description property to share vue instance
   */
  public static vueInstance: App;

  /**
   * @description initialize vue axios
   */
  public static init(app: App<Element>) {
    ApiService.vueInstance = app;
    ApiService.vueInstance.use(VueAxios, axios);
    // ApiService.vueInstance.axios.defaults.baseURL = "https://nextpay-admin-api-staging.latipay.net/api";
    ApiService.vueInstance.axios.defaults.baseURL =
      process.env.VUE_APP_API_BASE_URL;
  }

  /**
   * @description set the default HTTP request headers
   */
  public static setHeader(): void {
    ApiService.vueInstance.axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${JwtService.getToken()}`;
    ApiService.vueInstance.axios.defaults.headers.common["Accept"] =
      "application/json";
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static query(
    resource: string,
    params: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(resource, params);
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param slug: string
   * @returns Promise<AxiosResponse>
   */
  public static get(
    resource: string,
    params?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(resource, params).catch((error) => {
      if (error.response.status === 401) {
        store
          .dispatch(Actions.LOGOUT)
          .then(() => router.push({ name: "sign-in" }));
      }
      throw new Error(`[KT] ApiService ${error}`);
    });
  }

  /**
   * @description set the POST HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static post(
    resource: string,
    data?: unknown,
    params?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    // return ApiService.vueInstance.axios.post(`${resource}`, params);

    return ApiService.vueInstance.axios
      .post(`${resource}`, data, params)
      .catch((error) => {
        if (error.response.status === 401) {
          store
            .dispatch(Actions.LOGOUT)
            .then(() => router.push({ name: "sign-in" }));
        }
        throw new Error(`[KT] ApiService ${error}`);
      });
  }

  /**
   * @description send the UPDATE HTTP request
   * @param resource: string
   * @param slug: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static update(
    resource: string,
    slug: string,
    params: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios
      .put(`${resource}/${slug}`, params)
      .catch((error) => {
        if (error.response.status === 401) {
          store
            .dispatch(Actions.LOGOUT)
            .then(() => router.push({ name: "sign-in" }));
        }
        throw new Error(`[KT] ApiService ${error}`);
      });
  }

  /**
   * @description Send the PUT HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static put(
    resource: string,
    data?: unknown,
    params?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios
      .put(`${resource}`, data, params)
      .catch((error) => {
        if (error.response.status === 401) {
          store
            .dispatch(Actions.LOGOUT)
            .then(() => router.push({ name: "sign-in" }));
        }
        throw new Error(`[KT] ApiService ${error}`);
      });
  }

  public static patch(
    resource: string,
    data?: unknown,
    params?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios
      .patch(`${resource}`, data, params)
      .catch((error) => {
        if (error.response.status === 401) {
          store
            .dispatch(Actions.LOGOUT)
            .then(() => router.push({ name: "sign-in" }));
        }
        throw new Error(`[KT] ApiService ${error}`);
      });
  }

  /**
   * @description Send the DELETE HTTP request
   * @param resource: string
   * @returns Promise<AxiosResponse>
   */
  public static delete(resource: string): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.delete(resource).catch((error) => {
      if (error.response.status === 401) {
        store
          .dispatch(Actions.LOGOUT)
          .then(() => router.push({ name: "sign-in" }));
      }
      throw new Error(`[KT] ApiService ${error}`);
    });
  }
}

export default ApiService;
