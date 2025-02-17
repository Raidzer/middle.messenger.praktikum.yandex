import { BaseAPI } from "../BaseAPI";
import {
  ISearchUserByLogin,
  IUserChangeData,
  IUserPasswordChangeData,
} from "./IUsersApi";

class UsersAPI extends BaseAPI {
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

  async changeUserPassword(data: IUserPasswordChangeData) {
    try {
      const response = await this._fetch.put("/password", { data });
      return response;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async searchUserByLogin(data: ISearchUserByLogin) {
    try {
      const response = await this._fetch.post("/search", { data });

      return response;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async changeUserAvatar(data: File) {
    try {
      const formData = new FormData();
      formData.append("avatar", data);
      const response = await this._fetch.put("/profile/avatar", {
        data: formData,
      });

      return response;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default new UsersAPI();
