import { ISigninData } from "./../../api/AuthAPI/IAuthAPI";
import Button from "../../components/button/Button";
import { ButtonClass, ButtonType } from "../../enums/Button";
import FormInput from "../../components/formInput/FormInput";
import { InputType } from "../../enums/Input";
import {
  ValidationMessageError,
  ValidationRulesRegExp,
} from "../../utils/validationRules/validationRules";
import loginPage from "./loginPage.hbs?raw";
import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import Router from "../../router/Router";
import { Routes } from "../../enums/Routes";
import "./loginPage.css";
import AuthController from "../../controller/AuthController";

const buttonSubmit = new Button({
  type: ButtonType.SUBMIT,
  label: "Войти",
  class: ButtonClass.PRIMARY,
});

const buttonCreate = new Button({
  type: ButtonType.BUTTON,
  label: "Нет аккаунта?",
  class: ButtonClass.SECONDARY,
  events: {
    click: {
      cb: () => Router.go(Routes.REGISTER),
    },
  },
});

const inputLogin = new FormInput({
  name: "login",
  type: InputType.TEXT,
  placeholder: "Логин",
  validate: {
    rule: ValidationRulesRegExp.login,
    errorMessage: ValidationMessageError.login,
  },
});

const inputPassword = new FormInput({
  name: "password",
  type: InputType.PASSWORD,
  placeholder: "Пароль",
  validate: {
    rule: ValidationRulesRegExp.password,
    errorMessage: ValidationMessageError.password,
  },
});

interface IBaseAuthFormPros extends IBlockProps {
  title?: string;
}

export class LoginPage extends Block<IBaseAuthFormPros> {
  constructor(props?: IBaseAuthFormPros) {
    props = {
      title: "Вход",
      buttonCreate,
      buttonSubmit,
      inputLogin,
      inputPassword,
      events: {
        submit: {
          cb: (event) => {
            event.preventDefault();
            const form = event.target;
            if (!form || !(form instanceof HTMLFormElement)) {
              return;
            }

            const dataValid =
              inputLogin.inputValidate() && inputPassword.inputValidate();

            if (!dataValid) {
              return;
            }

            const data: ISigninData = {
              login: inputLogin.value,
              password: inputPassword.value,
            };

            AuthController.signin(data);
          },
        },
      },
    };
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(loginPage, this.props);
  }
}
