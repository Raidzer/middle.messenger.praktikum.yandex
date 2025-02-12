import { ISignupData } from "../../api/AuthAPI/IAuthAPI";
import Button from "../../components/button/Button";
import FormInput from "../../components/formInput/FormInput";
import AuthController from "../../controller/AuthController";
import { ButtonClass, ButtonType } from "../../enums/Button";
import { InputType } from "../../enums/Input";
import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import {
  ValidationMessageError,
  ValidationRulesRegExp,
} from "../../utils/validationRules/validationRules";
import "./registerPage.css";
import registerPage from "./registerPage.hbs?raw";

const inputEmail = new FormInput({
  name: "email",
  type: InputType.TEXT,
  placeholder: "Почта",
  validate: {
    rule: ValidationRulesRegExp.Email,
    errorMessage: ValidationMessageError.Email,
  },
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

const inputFirstName = new FormInput({
  name: "first_name",
  type: InputType.TEXT,
  placeholder: "Имя",
  validate: {
    rule: ValidationRulesRegExp.Name,
    errorMessage: ValidationMessageError.Name,
  },
});

const inputSecondName = new FormInput({
  name: "second_name",
  type: InputType.TEXT,
  placeholder: "Фамилия",
  validate: {
    rule: ValidationRulesRegExp.Name,
    errorMessage: ValidationMessageError.Name,
  },
});

const inputPhone = new FormInput({
  name: "phone",
  type: InputType.TEXT,
  placeholder: "Телефон",
  validate: {
    rule: ValidationRulesRegExp.Phone,
    errorMessage: ValidationMessageError.Phone,
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

const buttonSubmit = new Button({
  type: ButtonType.SUBMIT,
  label: "Регистрация",
  class: ButtonClass.PRIMARY,
});

interface IBaseAuthFormPros extends IBlockProps {
  title?: string;
}

export class RegisterPage extends Block<IBaseAuthFormPros> {
  constructor(props?: IBaseAuthFormPros) {
    props = {
      events: {
        submit: {
          cb: (event) => {
            event.preventDefault();

            const form = event.target;
            if (!form || !(form instanceof HTMLFormElement)) {
              return;
            }

            const dataValid =
              inputEmail.inputValidate() &&
              inputFirstName.inputValidate() &&
              inputSecondName.inputValidate() &&
              inputLogin.inputValidate() &&
              inputPassword.inputValidate() &&
              inputPhone.inputValidate();

            if (!dataValid) {
              return;
            }

            const data: ISignupData = {
              email: inputEmail.value,
              first_name: inputFirstName.value,
              login: inputLogin.value,
              password: inputPassword.value,
              phone: inputPhone.value,
              second_name: inputSecondName.value,
            };

            AuthController.signup(data);
          },
        },
      },
      title: "Регистрация",
      inputEmail,
      inputFirstName,
      inputSecondName,
      inputLogin,
      inputPassword,
      inputPhone,
      buttonSubmit,
    };
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(registerPage, this.props);
  }
}
