import render from "../../utils/utils";
import "../../styles/styles.css";
import Button from "../../components/button/Button";
import { ButtonClass, ButtonType } from "../../enums/Button";
import FormInput from "../../components/formInput/FormInput";
import { InputType } from "../../enums/Input";
import {
  ValidationMessageError,
  ValidationRulesRegExp,
} from "../../utils/validationRules/validationRules";
import { BaseAuthForm } from "../../components/baseAuthForm/BaseAuthForm";

document.addEventListener("DOMContentLoaded", () => {
  const buttonSubmit = new Button({
    type: ButtonType.SUBMIT,
    label: "Войти",
    class: ButtonClass.PRIMARY,
  });

  const buttonCreate = new Button({
    type: ButtonType.BUTTON,
    label: "Нет аккаунта?",
    class: ButtonClass.SECONDARY,
  });

  const inputLogin = new FormInput({
    name: "login",
    type: InputType.TEXT,
    placeholder: "Логин",
    validate: {
      rule: ValidationRulesRegExp.Login,
      errorMessage: ValidationMessageError.Login,
    },
  });

  const inputPassword = new FormInput({
    name: "password",
    type: InputType.PASSWORD,
    placeholder: "Пароль",
    validate: {
      rule: ValidationRulesRegExp.Password,
      errorMessage: ValidationMessageError.Password,
    },
  });

  const loginForm = new BaseAuthForm({
    title: "Вход",
    buttonCreate,
    buttonSubmit,
    inputLogin,
    inputPassword,
    events: {
      submit: (event) => {
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

        const formData = new FormData(form);

        const formDataObj: Record<string, string> = {};
        formData.forEach((value, key) => {
          formDataObj[key] = value as string;
        });

        console.table(formDataObj);
      },
    },
  });

  render(".root", [loginForm]);
});
