import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import { Base64Utils } from "@/latipay/utils/Base64Utils";

export interface User {
  id: string,
  username:string;
  email:string;
  password: string;
  access_token: string;
  refresh_token:string;
}

export interface UserAuthInfo {
  errors: unknown;
  user: User;
  isAuthenticated: boolean;
}

@Module
export default class AuthModule extends VuexModule implements UserAuthInfo {
  errors = {};
  user =  AuthModule.parseAccessToken(JwtService.getToken());
  isAuthenticated = !!JwtService.getToken();

  /**
   * Get current user object
   * @returns User
   */
  get currentUser(): User {
    return this.user;
  }

  /**
   * Verify user authentication
   * @returns boolean
   */
  get isUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  /**
   * Get authentification errors
   * @returns array
   */
  get getErrors() {
    return this.errors;
  }


  static parseAccessToken(accessToken): User {
    try {
      if (accessToken) {
        const tokenInfo = accessToken.split(".");
        const payload = JSON.parse(Base64Utils.decode(tokenInfo[1]));
        return {
          id: payload.sub,
          username: payload.username,
          email: payload.email,
          access_token: accessToken,
          refresh_token: accessToken,
          password: "",
        };
      } else {
        return {} as User;
      }
    } catch (ex) {
      return {} as User;
    }
  }

  @Mutation
  [Mutations.SET_ERROR](error) {
    this.errors = { ...error };
  }

  @Mutation
  [Mutations.SET_AUTH](user) {
    this.isAuthenticated = true;
    this.errors = {};
    this.user =  AuthModule.parseAccessToken(user.accessToken);
    JwtService.saveToken(user.data.accessToken);
    console.log(this.user.email);
    // JwtService.saveToken(user.api_token);
  }

  @Mutation
  [Mutations.SET_USER](user) {
    this.user = user;
  }

  @Mutation
  [Mutations.SET_PASSWORD](password) {
    this.user.password = password;
  }

  @Mutation
  [Mutations.PURGE_AUTH]() {
    this.isAuthenticated = false;
    this.user = {} as User;
    this.errors = [];
    JwtService.destroyToken();
  }

  @Action({ rawError: true })
  [Actions.LOGIN](credentials) {
    return ApiService.post("/auth/login", credentials)
      .then(({ data }) => {

        this.context.commit(Mutations.SET_AUTH, data);
        console.log(credentials);
        console.log(data);
      })
      .catch(({ response }) => {


        console.log(response);


        const errors: string[] = [];
        if (response && response.data && response.data.code == "adminApi.auth.invalidLoginCredential") {

          errors.push("latipay.pages.signIn.loginInvalidGrant");
        } else {
          errors.push("Username or password is incorrect");

        }
        this.context.commit(Mutations.SET_ERROR, errors);
      });
  }

  @Action
  [Actions.LOGOUT]() {
    this.context.commit(Mutations.PURGE_AUTH);
  }

  @Action
  [Actions.REGISTER](credentials) {
    return ApiService.post("register", credentials)
      .then(({ data }) => {
        this.context.commit(Mutations.SET_AUTH, data);
      })
      .catch(({ response }) => {


        this.context.commit(Mutations.SET_ERROR, response.data.errors);
      });
  }

  @Action
  [Actions.FORGOT_PASSWORD](payload) {
    return ApiService.post("forgot_password", payload)
      .then(() => {
        this.context.commit(Mutations.SET_ERROR, {});
      })
      .catch(({ response }) => {
        this.context.commit(Mutations.SET_ERROR, response.data.errors);
      });
  }

  @Action
  [Actions.VERIFY_AUTH]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("verify")
        .then(({ data }) => {
          this.context.commit(Mutations.SET_AUTH, data);
        })
        .catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR, response.data.errors);

        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }

  @Action
  [Actions.UPDATE_USER](payload) {
    ApiService.setHeader();
    return new Promise<void>((resolve, reject) => {
    ApiService.post("update_user", payload)
      .then(({ data }) => {
        this.context.commit(Mutations.SET_USER, data);
        resolve();
      })
      .catch(({ response }) => {
        this.context.commit(Mutations.SET_ERROR, response.data.errors);
        reject();
      });
    });
  }



}
