import { BaseAuthForm } from "../../components/baseAuthForm/BaseAuthForm";
import Button from "../../components/Button/Button";
import FormInput from "../../components/formInput/FormInput";
import { ButtonClass, ButtonType } from "../../enums/Button";
import { InputType } from "../../enums/Input";
import render from "../../utils/utils";
import {
  ValidationMessageError,
  ValidationRulesRegExp,
} from "../../utils/validationRules";

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

const registerForm = new BaseAuthForm({
  events: {
    submit: (event) => {
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

      const formData = new FormData(form);

      const formDataObj: Record<string, string> = {};
      formData.forEach((value, key) => {
        formDataObj[key] = value as string;
      });

      console.table(formDataObj);
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
});

render(".root", [registerForm]);
