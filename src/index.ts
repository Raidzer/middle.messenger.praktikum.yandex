import AuthController from "./controller/AuthController.ts";
import { HTTPStatus } from "./enums/HTTP.ts";
import { Routes } from "./enums/Routes.ts";
import { ChangePasswordPage } from "./pages/changePassword/ChangePasswordPage.ts";
import { Error404Page } from "./pages/error404/Error404Page.ts";
import { Error500Page } from "./pages/error500/Error500Page.ts";
import { LoginPage } from "./pages/login/LoginPage.ts";
import { MessagePage } from "./pages/message/MessagePage.ts";
import { RegisterPage } from "./pages/register/RegisterPage.ts";
import UserProfilePage from "./pages/userProfile/UserProfilePage.ts";
import Router from "./router/Router.ts";

window.addEventListener("DOMContentLoaded", async () => {
  if (window.location.pathname === "/") {
    const response = await AuthController.getUser();
    if (response && response.status === HTTPStatus.OK) {
      Router.go(Routes.CHAT);
    }
  }

  Router.use(Routes.LOGIN, LoginPage)
    .use(Routes.REGISTER, RegisterPage)
    .use(Routes.ERROR404, Error404Page)
    .use(Routes.ERROR500, Error500Page)
    .use(Routes.CHAT, MessagePage)
    .use(Routes.PROFILE, UserProfilePage)
    .use(Routes.CHANGEPASSWORD, ChangePasswordPage)
    .start();
});
