import { BaseAPI } from "../BaseAPI";
import { ISigninData, ISignupData } from "./IAuthAPI";

class AuthAPI extends BaseAPI {
  constructor() {
    super("/auth");
  }

  async signin(data: ISigninData) {
    try {
      const resp = await this._fetch.post("/signin", { data });
      return resp;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async signup(data: ISignupData) {
    try {
      const resp = await this._fetch.post("/signup", { data });

      return resp;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async userInfo() {
    try {
      const resp = await this._fetch.get("/user");
      return resp;
    } catch (error) {
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
