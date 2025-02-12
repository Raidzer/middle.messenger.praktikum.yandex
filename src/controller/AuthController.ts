import AuthAPI from "../api/AuthAPI/AuthAPI";
import { ISigninData, ISignupData } from "../api/AuthAPI/IAuthAPI";

class AuthController {
  public getUser() {
    AuthAPI.userInfo();
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
