import AuthAPI from "../api/AuthAPI/AuthAPI";
import { ISigninData, ISignupData } from "../api/AuthAPI/IAuthAPI";
import { Routes } from "../enums/Routes";
import Router from "../router/Router";
import store from "../store/Store";
import ChatsController from "./ChatsController";

class AuthController {
  public async getUser() {
    try {
      const response = await AuthAPI.userInfo();

      if (!response) {
        return;
      }

      if (response.status === 200) {
        store.set("user", response.data);
        return response;
      } else if (response.status === 401) {
        Router.go(Routes.LOGIN);
      }
    } catch (error) {
      console.warn(error);
      Router.go(Routes.LOGIN);
    }
  }

  public async signin(data: ISigninData) {
    try {
      await this.logout();
      const response = await AuthAPI.signin(data);
      this._checkStatusResponse(response);
    } catch (error) {
      console.log(error);
    }
  }

  public async signup(data: ISignupData) {
    await this.logout();
    const response = await AuthAPI.signup(data);

    this._checkStatusResponse(response);
  }

  public async logout() {
    await AuthAPI.logout();
  }

  private async _checkStatusResponse(response: {
    data: unknown;
    status: number;
  }): Promise<void> {
    if (response.status >= 500) {
      Router.go(Routes.ERROR500);
    }

    if (response.status === 200) {
      await ChatsController.getChats();
      Router.go(Routes.CHAT);
    }
  }
}

export default new AuthController();
