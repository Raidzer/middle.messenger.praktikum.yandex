import { BaseAPI } from "../BaseAPI";
import { IPasswordChangeData, IUserChangeData } from "./IUserApi";

class UserAPI extends BaseAPI {
  constructor() {
    super("/user");
  }

  async changeUserProfile(data: IUserChangeData) {
    try {
      const response = await this._fetch.put("/profile", { data });
      return response;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async changeUserPassword(data: IPasswordChangeData) {
    try {
      const response = await this._fetch.put("/password", { data });
      return response;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default new UserAPI();
