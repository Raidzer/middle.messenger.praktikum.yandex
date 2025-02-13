import AuthAPI from "../api/AuthAPI/AuthAPI";
import { ISigninData, ISignupData } from "../api/AuthAPI/IAuthAPI";
import { Routes } from "../enums/Routes";
import Router from "../router/Router";
import store from "../store/Store";

class AuthController {
  public async getUser() {
    try {
      const resp = await AuthAPI.userInfo();

      if (!resp) {
        return;
      }

      if (resp.status === 200) {
        store.set("user", resp.data);
      } else if (resp.status === 401) {
        Router.go(Routes.LOGIN);
      }
    } catch (error) {
      console.warn(error);
      Router.go(Routes.LOGIN);
    }
  }

  public async signin(data: ISigninData) {
    const response = await AuthAPI.signin(data);

    this._checkStatusResponse(response);
  }

  public async signup(data: ISignupData) {
    const response = await AuthAPI.signup(data);

    this._checkStatusResponse(response);
  }

  public logout() {
    AuthAPI.logout();
  }

  private _checkStatusResponse(response: {
    data: unknown;
    status: number;
  }): void {
    if (response.status >= 500) {
      Router.go(Routes.ERROR500);
    }

    if (response.status === 200) {
      Router.go(Routes.CHAT);
    }
  }
}

export default new AuthController();
