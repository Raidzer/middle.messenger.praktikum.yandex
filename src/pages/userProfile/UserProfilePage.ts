import Button from "../../components/button/Button";
import { InfoRow } from "../../components/infoRow/InfoRow";
import { userInfoForm } from "../../components/userInfoForm/userInfoForm";
import AuthController from "../../controller/AuthController";
import { ButtonClass, ButtonType } from "../../enums/Button";
import { InputType } from "../../enums/Input";
import { Routes } from "../../enums/Routes";
import { StoreEvents } from "../../enums/StoreEvents";
import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import Router from "../../router/Router";
import store from "../../store/Store";
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

const infoSkeleton = {
  email: "Почта",
  login: "Логин",
  first_name: "Имя",
  second_name: "Фамилия",
  display_name: "Имя в чате",
  phone: "Телефон",
};

const input = Object.entries(infoSkeleton).map(([key, value]) => {
  return new InfoRow({
    infoName: value,
    type: InputType.TEXT,
    isEditable: false,
    name: key,
    placeholder: value,
  });
});

store.on(StoreEvents.Update, () => {
  const data = store.getState();
  input.forEach((el) => {
    const inputName = el.props.name;
    if (data.user[inputName]) {
      el.setProps({ value: data.user[inputName] });
      console.log(el);
    }
  });
});

export class UserProfilePage extends Block<IBlockProps> {
  constructor(props?: IBlockProps) {
    props = {
      input,
      buttonChangePassword,
      buttonChangeUserInfo,
      buttonLogout,
    };
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(userProfilePage, this.props);
  }
}
