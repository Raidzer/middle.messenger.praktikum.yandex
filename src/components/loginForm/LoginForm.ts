import { ButtonClass, ButtonType } from "../../enums/Button";
import { InputType } from "../../enums/Input";
import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import Button from "../Button/Button";
import FormInput from "../formInput/FormInput";
import loginForm from "./loginForm.hbs?raw";
import "./loginForm.css";

const inputLogin = new FormInput({
  name: "login",
  type: InputType.TEXT,
  placeholder: "Логин",
  settings: {
    withInternalID: true,
  },
});

const inputPassword = new FormInput({
  name: "password",
  type: InputType.PASSWORD,
  placeholder: "Пароль",
  settings: {
    withInternalID: true,
  },
});

const buttonSubmit = new Button({
  type: ButtonType.SUBMIT,
  label: "Войти",
  class: ButtonClass.PRIMARY,
  settings: {
    withInternalID: true,
  },
});

const buttonCreate = new Button({
  type: ButtonType.SUBMIT,
  label: "Нет аккаунта?",
  class: ButtonClass.SECONDARY,
  settings: {
    withInternalID: true,
  },
});

export class LoginForm extends Block<IBlockProps> {
  constructor(props: IBlockProps) {
    super({
      ...props,
      inputLogin,
      inputPassword,
      buttonSubmit,
      buttonCreate,
    });
  }

  render(): DocumentFragment {
    return this.compile(loginForm, this.props);
  }
}
