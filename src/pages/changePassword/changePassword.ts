import Button from "../../components/button/Button";
import { userInfoForm } from "../../components/userInfoForm/userInfoForm";
import { InfoRow } from "../../components/infoRow/InfoRow";
import { UserProfile } from "../../components/userProfile/UserProfile";
import { ButtonClass, ButtonType } from "../../enums/Button";
import { InputType } from "../../enums/Input";
import render from "../../utils/utils";
import {
  ValidationMessageError,
  ValidationRulesRegExp,
} from "../../utils/validationRules/validationRules";

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
    rule: ValidationRulesRegExp.Password,
    errorMessage: ValidationMessageError.Password,
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
    rule: ValidationRulesRegExp.Password,
    errorMessage: ValidationMessageError.Password,
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
    rule: ValidationRulesRegExp.Password,
    errorMessage: ValidationMessageError.Password,
  },
});

const changePasswordForm = new userInfoForm({
  buttonSave,
  infoRowOldPassword,
  infoRowNewPassword,
  infoRowNewPasswordRepeat,
  userName: "Иван",
  events: {
    submit: (event) => {
      event.preventDefault();

      const form = event.target;
      if (!form || !(form instanceof HTMLFormElement)) {
        return;
      }

      const dataValid =
        infoRowOldPassword.inputValidate() &&
        infoRowNewPassword.inputValidate() &&
        infoRowNewPasswordRepeat.inputValidate();

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

const page = new UserProfile({
  form: changePasswordForm,
});

render(".root", [page]);
