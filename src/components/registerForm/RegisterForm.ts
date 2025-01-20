import { IBlockProps } from "./../../models/Block/IBlock";
import Block from "../../models/Block/Block";
import registerForm from "./registerForm.hbs?raw";
import FormInput from "../formInput/FormInput";
import { InputType } from "../../enums/Input";
import Button from "../Button/Button";
import { ButtonClass, ButtonType } from "../../enums/Button";
import "./register.css";

const inputEmail = new FormInput({
  name: "email",
  type: InputType.TEXT,
  placeholder: "Почта",
});

const inputLogin = new FormInput({
  name: "login",
  type: InputType.TEXT,
  placeholder: "Логин",
});

const inputFirstName = new FormInput({
  name: "first_name",
  type: InputType.TEXT,
  placeholder: "Имя",
});

const inputSecondName = new FormInput({
  name: "second_name",
  type: InputType.TEXT,
  placeholder: "Фамилия",
});

const inputPhone = new FormInput({
  name: "phone",
  type: InputType.TEXT,
  placeholder: "Телефон",
});

const inputPassword = new FormInput({
  name: "password",
  type: InputType.TEXT,
  placeholder: "Пароль",
});

const inputPasswordRepeat = new FormInput({
  name: "password",
  type: InputType.TEXT,
  placeholder: "Пароль (еще раз)",
});

const buttonRegister = new Button({
  type: ButtonType.SUBMIT,
  label: "Регистрация",
  class: ButtonClass.PRIMARY,
});

export class RegisterForm extends Block<IBlockProps> {
  constructor(props: IBlockProps) {
    super({
      ...props,
      inputEmail,
      inputFirstName,
      inputSecondName,
      inputLogin,
      inputPassword,
      inputPasswordRepeat,
      inputPhone,
      buttonRegister,
    });
  }

  render(): DocumentFragment {
    return this.compile(registerForm, this.props);
  }
}
