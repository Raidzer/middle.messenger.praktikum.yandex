import { LoginForm } from "../../components/loginForm/LoginForm";
import render from "../../utils/utils";
import "../../styles/styles.css";
import Button from "../../components/Button/Button";
import { ButtonClass, ButtonType } from "../../enums/Button";
import FormInput from "../../components/formInput/FormInput";
import { InputType } from "../../enums/Input";

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
  });

  const inputPassword = new FormInput({
    name: "password",
    type: InputType.PASSWORD,
    placeholder: "Пароль",
  });

  const loginForm = new LoginForm({
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
