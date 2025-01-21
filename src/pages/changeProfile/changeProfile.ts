import Button from "../../components/Button/Button";
import {
  userInfoForm,
} from "../../components/userInfoForm/userInfoForm";
import { InfoRow } from "../../components/infoRow/InfoRow";
import { UserProfile } from "../../components/userProfile/UserProfile";
import { ButtonClass, ButtonType } from "../../enums/Button";
import { InputType } from "../../enums/Input";
import render from "../../utils/utils";

const buttonSave = new Button({
  type: ButtonType.SUBMIT,
  label: "Сохранить изменения",
  class: ButtonClass.PRIMARY,
});

const infoRowEmail = new InfoRow({
  infoName: "Почта",
  type: InputType.TEXT,
  isEditable: true,
  infoData: "pochta@yandex.ru",
  name: "email",
  placeholder: "Почта",
});

const infoRowLogin = new InfoRow({
  infoName: "Логин",
  type: InputType.TEXT,
  isEditable: true,
  infoData: "ivan",
  name: "login",
  placeholder: "Логин",
});

const infoRowFirstName = new InfoRow({
  infoName: "Имя",
  type: InputType.TEXT,
  isEditable: true,
  infoData: "Иван",
  name: "first_name",
  placeholder: "Имя",
});

const infoRowSecondName = new InfoRow({
  infoName: "Фамилия",
  type: InputType.TEXT,
  isEditable: true,
  infoData: "Иванов",
  name: "second_name",
  placeholder: "Фамилия",
});

const infoRowDisplayName = new InfoRow({
  infoName: "Имя в чате",
  type: InputType.TEXT,
  isEditable: true,
  infoData: "Иван",
  name: "display_name",
  placeholder: "Имя в чате",
});

const infoRowPhone = new InfoRow({
  infoName: "Телефон",
  type: InputType.TEXT,
  isEditable: true,
  infoData: "1234567890",
  name: "phone",
  placeholder: "Телефон",
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
});

const page = new UserProfile({
  form: changeInfoUserForm,
});

render(".root", [page]);
