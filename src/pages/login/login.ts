import { LoginForm } from "../../components/loginForm/LoginForm";
import render from "../../utils/utils";
import "../../styles/styles.css";
import Button from "../../components/Button/Button";
import { ButtonClass, ButtonType } from "../../enums/Button";
import FormInput from "../../components/formInput/FormInput";
import { InputType } from "../../enums/Input";

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
    click: () => console.log("123"),
  },
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

const loginForm = new LoginForm({});

loginForm.setProps({ buttonCreate, buttonSubmit, inputLogin, inputPassword });

render(".root", [loginForm]);
