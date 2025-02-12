import Button from "../../components/button/Button";
import { InfoRow } from "../../components/infoRow/InfoRow";
import { userInfoForm } from "../../components/userInfoForm/userInfoForm";
import AuthController from "../../controller/AuthController";
import { ButtonClass, ButtonType } from "../../enums/Button";
import { InputType } from "../../enums/Input";
import { Routes } from "../../enums/Routes";
import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import Router from "../../router/Router";
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

const buttonLogout = new Button({
  type: ButtonType.BUTTON,
  label: "Выйти из профиля",
  class: ButtonClass.PRIMARY,
  events: {
    click: {
      cb: () => {
        try {
          AuthController.logout();
          Router.go(Routes.LOGIN);
        } catch (error) {
          console.warn(error);
        }
      },
    },
  },
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
  buttonLogout,
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
