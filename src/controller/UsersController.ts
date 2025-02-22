import {
  ISearchUserByLogin,
  IUserChangeData,
  IUserPasswordChangeData,
} from "../api/UsersAPI/IUsersApi";
import UserAPI from "../api/UsersAPI/UsersAPI";
import { HTTPStatus } from "../enums/HTTP";
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

      if (response.status === HTTPStatus.OK) {
        store.set("user", response.data);
      }
    } catch (error) {
      console.warn(error);
    }
  }

  public async changeUserPassword(data: IUserPasswordChangeData) {
    try {
      const response = await UserAPI.changeUserPassword(data);

      if (!response) {
        return;
      }

      if (response.status === HTTPStatus.OK) {
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

      if (response.status === HTTPStatus.OK) {
        store.set("userSearchList", response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  public clearSearchUser() {
    store.set("userSearchList", []);
  }

  public async changeUserAvatar(data: File) {
    try {
      const response = await UserAPI.changeUserAvatar(data);

      if (response.status === HTTPStatus.OK) {
        store.set("user", response.data);
      }

      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UsersController();
