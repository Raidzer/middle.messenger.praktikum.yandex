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
        if (window.location.pathname === "/") {
          Router.go(Routes.CHAT);
        } else {
          Router.go(window.location.pathname);
        }
      } else {
        Router.go(Routes.LOGIN);
      }
    } catch (error) {
      console.warn(error);
      Router.go(Routes.LOGIN);
    }
  }

  public async signin(data: ISigninData) {
    await AuthAPI.signin(data);
    this.getUser();
  }

  public async signup(data: ISignupData) {
    await AuthAPI.signup(data);
    this.getUser();
  }

  public logout() {
    AuthAPI.logout();
  }
}

export default new AuthController();
