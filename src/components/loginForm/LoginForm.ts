import { ButtonClass, ButtonType } from "../../enums/Button";
import { InputType } from "../../enums/Input";
import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import Button from "../button/Button";
import FormInput from "../formInput/FormInput";
import loginForm from "./loginForm.hbs";
import "./loginForm.css";

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

const buttonSubmit = new Button({
  type: ButtonType.SUBMIT,
  label: "Войти",
  class: ButtonClass.PRIMARY,
});

const buttonCreate = new Button({
  type: ButtonType.SUBMIT,
  label: "Нет аккаунта?",
  class: ButtonClass.SECONDARY,
});

export class LoginForm extends Block<IBlockProps> {
  constructor(props: IBlockProps) {
    super("div", {
      ...props,
      children: { inputLogin, inputPassword, buttonSubmit, buttonCreate },
    });
  }

  render(): string {
    const element = loginForm(this.props);

    return element;
  }
}
