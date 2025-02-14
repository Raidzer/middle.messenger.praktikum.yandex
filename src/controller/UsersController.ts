import {
  IPasswordChangeData,
  ISearchUserByLogin,
  IUserChangeData,
} from "../api/UsersAPI/IUsersApi";
import UserAPI from "../api/UsersAPI/UsersAPI";
import { Routes } from "../enums/Routes";
import Router from "../router/Router";
import store from "../store/Store";

class UsersController {
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

  public async searchUserByLogin(data: ISearchUserByLogin) {
    try {
      const response = await UserAPI.searchUserByLogin(data);

      if (!response) {
        return;
      }

      if (response.status === 200) {
        store.set("userSearchList", response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UsersController();
