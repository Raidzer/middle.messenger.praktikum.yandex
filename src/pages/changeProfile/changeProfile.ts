import Button from "../../components/Button/Button";
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
  label: "Сохранить изменения",
  class: ButtonClass.PRIMARY,
});

const infoRowEmail = new InfoRow({
  infoName: "Почта",
  type: InputType.TEXT,
  isEditable: true,
  value: "pochta@yandex.ru",
  name: "email",
  placeholder: "Почта",
  validate: {
    rule: ValidationRulesRegExp.Email,
    errorMessage: ValidationMessageError.Email,
  },
});

const infoRowLogin = new InfoRow({
  infoName: "Логин",
  type: InputType.TEXT,
  isEditable: true,
  value: "ivan",
  name: "login",
  placeholder: "Логин",
  validate: {
    rule: ValidationRulesRegExp.Login,
    errorMessage: ValidationMessageError.Login,
  },
});

const infoRowFirstName = new InfoRow({
  infoName: "Имя",
  type: InputType.TEXT,
  isEditable: true,
  value: "Иван",
  name: "first_name",
  placeholder: "Имя",
  validate: {
    rule: ValidationRulesRegExp.Name,
    errorMessage: ValidationMessageError.Name,
  },
});

const infoRowSecondName = new InfoRow({
  infoName: "Фамилия",
  type: InputType.TEXT,
  isEditable: true,
  value: "Иванов",
  name: "second_name",
  placeholder: "Фамилия",
  validate: {
    rule: ValidationRulesRegExp.Name,
    errorMessage: ValidationMessageError.Name,
  },
});

const infoRowDisplayName = new InfoRow({
  infoName: "Имя в чате",
  type: InputType.TEXT,
  isEditable: true,
  value: "Иван",
  name: "display_name",
  placeholder: "Имя в чате",
  validate: {
    rule: ValidationRulesRegExp.Name,
    errorMessage: ValidationMessageError.Name,
  },
});

const infoRowPhone = new InfoRow({
  infoName: "Телефон",
  type: InputType.TEXT,
  isEditable: true,
  value: "1234567890",
  name: "phone",
  placeholder: "Телефон",
  validate: {
    rule: ValidationRulesRegExp.Phone,
    errorMessage: ValidationMessageError.Phone,
  },
});

const changeInfoUserForm = new userInfoForm({
  buttonSave,
  infoRowEmail,
  infoRowLogin,
  infoRowFirstName,
  infoRowSecondName,
  infoRowDisplayName,
  infoRowPhone,
  userName: "Иван",
  events: {
    submit: (event) => {
      event.preventDefault();

      const form = event.target;
      if (!form || !(form instanceof HTMLFormElement)) {
        return;
      }

      const dataValid =
        infoRowEmail.inputValidate() &&
        infoRowLogin.inputValidate() &&
        infoRowFirstName.inputValidate() &&
        infoRowSecondName.inputValidate() &&
        infoRowDisplayName.inputValidate() &&
        infoRowPhone.inputValidate();

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
  form: changeInfoUserForm,
});

render(".root", [page]);
