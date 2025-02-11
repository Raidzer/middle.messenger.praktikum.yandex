import Button from "../../components/button/Button";
import { InfoRow } from "../../components/infoRow/InfoRow";
import { userInfoForm } from "../../components/userInfoForm/userInfoForm";
import { ButtonClass, ButtonType } from "../../enums/Button";
import { InputType } from "../../enums/Input";
import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import "./userProfilePage.css";
import userProfilePage from "./userProfilePage.hbs?raw";

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
  value: "pochta@yandex.ru",
  name: "email",
  placeholder: "Почта",
});

const infoRowLogin = new InfoRow({
  infoName: "Логин",
  type: InputType.TEXT,
  isEditable: false,
  value: "ivan",
  name: "login",
  placeholder: "Логин",
});

const infoRowFirstName = new InfoRow({
  infoName: "Имя",
  type: InputType.TEXT,
  isEditable: false,
  value: "Иван",
  name: "first_name",
  placeholder: "Имя",
});

const infoRowSecondName = new InfoRow({
  infoName: "Фамилия",
  type: InputType.TEXT,
  isEditable: false,
  value: "Иванов",
  name: "second_name",
  placeholder: "Фамилия",
});

const infoRowDisplayName = new InfoRow({
  infoName: "Имя в чате",
  type: InputType.TEXT,
  isEditable: false,
  value: "Иван",
  name: "display_name",
  placeholder: "Имя в чате",
});

const infoRowPhone = new InfoRow({
  infoName: "Телефон",
  type: InputType.TEXT,
  isEditable: false,
  value: "1234567890",
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

export class UserProfilePage extends Block<IBlockProps> {
  constructor(props?: IBlockProps) {
    props = {
      form: changeInfoUserForm,
    };
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(userProfilePage, this.props);
  }
}
