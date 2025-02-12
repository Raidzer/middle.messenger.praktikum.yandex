import AuthAPI from "../api/AuthAPI/AuthAPI";
import { ISigninData, ISignupData } from "../api/AuthAPI/IAuthAPI";
import Store from "../store/Store";

class AuthController {
  public getUser() {
    Store.set("label", "Привет");
  }

  public signin(data: ISigninData) {
    AuthAPI.signin(data);
  }

  public signup(data: ISignupData) {
    AuthAPI.signup(data);
  }
}

export default new AuthController();
