import { LoginPage } from "./pages/login/LoginPage.ts";
import { RegisterPage } from "./pages/register/RegisterPage.ts";
import Router from "./router/Router.ts";

window.addEventListener("DOMContentLoaded", () => {
  Router.use("/", LoginPage).use("/register", RegisterPage).start();
});
