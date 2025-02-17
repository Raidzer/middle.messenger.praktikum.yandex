import Button from "../../components/button/Button";
import { InfoRow } from "../../components/infoRow/InfoRow";
import { userInfoForm } from "../../components/userInfoForm/userInfoForm";
import { ButtonClass, ButtonType } from "../../enums/Button";
import { InputType } from "../../enums/Input";
import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import {
  ValidationMessageError,
  ValidationRulesRegExp,
} from "../../utils/validationRules/validationRules";
import changePasswordPage from "./changePasswordPage.hbs?raw";
import "./changePasswordPage.css";
import { IUserPasswordChangeData } from "../../api/UsersAPI/IUsersApi";
import UsersController from "../../controller/UsersController";
import Router from "../../router/Router";
import UserAvatar from "../../components/userAvatar/UserAvatar";

const buttonSave = new Button({
  type: ButtonType.SUBMIT,
  label: "Изменить пароль",
  class: ButtonClass.PRIMARY,
});

const infoRowOldPassword = new InfoRow({
  infoName: "Пароль",
  type: InputType.PASSWORD,
  isEditable: true,
  infoData: "",
  name: "oldPassword",
  placeholder: "Пароль",
  validate: {
    rule: ValidationRulesRegExp.password,
    errorMessage: ValidationMessageError.password,
  },
});

const infoRowNewPassword = new InfoRow({
  infoName: "Новый пароль",
  type: InputType.PASSWORD,
  isEditable: true,
  infoData: "",
  name: "newPassword",
  placeholder: "Новый пароль",
  validate: {
    rule: ValidationRulesRegExp.password,
    errorMessage: ValidationMessageError.password,
  },
});

const infoRowNewPasswordRepeat = new InfoRow({
  infoName: "Новый пароль (еще раз)",
  type: InputType.PASSWORD,
  isEditable: true,
  infoData: "",
  name: "newPasswordRepeat",
  placeholder: "Новый пароль (еще раз)",
  validate: {
    rule: ValidationRulesRegExp.password,
    errorMessage: ValidationMessageError.password,
  },
});

const buttonBack = new Button({
  type: ButtonType.BUTTON,
  icon: "fa-solid fa-arrow-left",
  events: {
    click: {
      cb: () => {
        Router.back();
        infoRowOldPassword.clearValue();
        infoRowNewPassword.clearValue();
        infoRowNewPasswordRepeat.clearValue();
      },
    },
  },
});

const changePasswordForm = new userInfoForm({
  buttonSave,
  infoRowOldPassword,
  infoRowNewPassword,
  infoRowNewPasswordRepeat,
  userName: "Иван",
  events: {
    submit: {
      cb: async (event) => {
        event.preventDefault();

        const form = event.target;
        if (!form || !(form instanceof HTMLFormElement)) {
          return;
        }

        const dataValid =
          infoRowOldPassword.inputValidate() &&
          infoRowNewPassword.inputValidate() &&
          infoRowNewPasswordRepeat.inputValidate() &&
          infoRowNewPassword.value === infoRowNewPasswordRepeat.value;

        if (!dataValid) {
          return;
        }

        const formData = new FormData(form);

        const formValues: IUserPasswordChangeData = {
          oldPassword: "",
          newPassword: "",
        };

        formData.forEach((value, key) => {
          if (key in formValues) {
            formValues[key as keyof IUserPasswordChangeData] = value as string;
          }
        });

        await UsersController.changeUserPassword(formValues);
        infoRowOldPassword.clearValue();
        infoRowNewPassword.clearValue();
        infoRowNewPasswordRepeat.clearValue();
      },
    },
  },
});

const userAvatar = new UserAvatar({});

export class ChangePasswordPage extends Block<IBlockProps> {
  constructor(props?: IBlockProps) {
    props = {
      form: changePasswordForm,
      buttonBack,
      userAvatar,
    };
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(changePasswordPage, this.props);
  }
}
