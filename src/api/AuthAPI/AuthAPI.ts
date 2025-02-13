import { Routes } from "../../enums/Routes";
import Router from "../../router/Router";
import { BaseAPI } from "../BaseAPI";
import { ISigninData, ISignupData } from "./IAuthAPI";

class AuthAPI extends BaseAPI {
  constructor() {
    super("/auth");
  }

  async signin(data: ISigninData) {
    try {
      const resp = await this._fetch.post("/signin", { data });
      if (this.responseOk(resp.status)) {
        Router.go(Routes.CHAT);
      }
    } catch (error) {
      console.warn(error);
    }
  }

  async signup(data: ISignupData) {
    try {
      const resp = await this._fetch.post("/signup", { data });
      if (this.responseOk(resp.status)) {
        Router.go(Routes.CHAT);
      }
    } catch (error) {
      console.warn(error);
    }
  }

  async userInfo() {
    try {
      const resp = await this._fetch.get("/user");
      return resp;
    } catch (error) {
      console.warn(error);
      throw new Error(`${error}`);
    }
  }

  async logout() {
    try {
      await this._fetch.post("/logout");
    } catch (error) {
      console.warn(error);
    }
  }
}

export default new AuthAPI();
