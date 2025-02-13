import { IPasswordChangeData, IUserChangeData } from "../api/UserAPI/IUserApi";
import UserAPI from "../api/UserAPI/UserAPI";
import { Routes } from "../enums/Routes";
import Router from "../router/Router";
import store from "../store/Store";

class UserController {
  public async changeUserInfo(data: IUserChangeData) {
    try {
      const response = await UserAPI.changeUserProfile(data);

      if (!response) {
        return;
      }

      if (response.status === 200) {
        store.set("user", response.data);
      }
    } catch (error) {
      console.warn(error);
    }
  }

  public async changeUserPassword(data: IPasswordChangeData) {
    try {
      const response = await UserAPI.changeUserPassword(data);

      if (!response) {
        return;
      }

      if (response.status === 200) {
        Router.go(Routes.PROFILE);
      }
    } catch (error) {
      console.warn(error);
    }
  }
}

export default new UserController();
