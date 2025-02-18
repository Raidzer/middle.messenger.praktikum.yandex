import { BaseAPI } from "../BaseAPI";
import { ISigninData, ISignupData } from "./IAuthAPI";

class AuthAPI extends BaseAPI {
  constructor() {
    super("/auth");
  }

  async signin(data: ISigninData) {
    try {
      const response = await this._fetch.post("/signin", { data });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }

      if (typeof error === "object" && error !== null && "data" in error) {
        const err = error as { data: { reason: string } };
        throw new Error(err.data.reason);
      }

      throw new Error("Unknown error occurred");
    }
  }

  async signup(data: ISignupData) {
    try {
      const response = await this._fetch.post("/signup", { data });

      return response;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async userInfo() {
    try {
      const response = await this._fetch.get("/user");
      return response;
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
