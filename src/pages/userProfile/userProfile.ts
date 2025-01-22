import Button from "../../components/Button/Button";
import { userInfoForm } from "../../components/userInfoForm/userInfoForm";
import { InfoRow } from "../../components/infoRow/InfoRow";
import { UserProfile } from "../../components/userProfile/UserProfile";
import { ButtonClass, ButtonType } from "../../enums/Button";
import { InputType } from "../../enums/Input";
import render from "../../utils/utils";

const buttonChangePassword = new Button({
  type: ButtonType.SUBMIT,
  label: "Изменить пароль",
  class: ButtonClass.SECONDARY,
});

const buttonChangeUserInfo = new Button({
  type: ButtonType.SUBMIT,
  label: "Изменить данные",
  class: ButtonClass.SECONDARY,
});

const infoRowEmail = new InfoRow({
  infoName: "Почта",
  type: InputType.TEXT,
  isEditable: false,
  infoData: "pochta@yandex.ru",
  name: "email",
  placeholder: "Почта",
});

const infoRowLogin = new InfoRow({
  infoName: "Логин",
  type: InputType.TEXT,
  isEditable: false,
  infoData: "ivan",
  name: "login",
  placeholder: "Логин",
});

const infoRowFirstName = new InfoRow({
  infoName: "Имя",
  type: InputType.TEXT,
  isEditable: false,
  infoData: "Иван",
  name: "first_name",
  placeholder: "Имя",
});

const infoRowSecondName = new InfoRow({
  infoName: "Фамилия",
  type: InputType.TEXT,
  isEditable: false,
  infoData: "Иванов",
  name: "second_name",
  placeholder: "Фамилия",
});

const infoRowDisplayName = new InfoRow({
  infoName: "Имя в чате",
  type: InputType.TEXT,
  isEditable: false,
  infoData: "Иван",
  name: "display_name",
  placeholder: "Имя в чате",
});

const infoRowPhone = new InfoRow({
  infoName: "Телефон",
  type: InputType.TEXT,
  isEditable: false,
  infoData: "1234567890",
  name: "phone",
  placeholder: "Телефон",
});

const changeInfoUserForm = new userInfoForm({
  buttonChangePassword,
  buttonChangeUserInfo,
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
