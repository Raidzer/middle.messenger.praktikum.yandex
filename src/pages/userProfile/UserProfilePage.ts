import { Routes } from "./../../enums/Routes";
import Button from "../../components/button/Button";
import { InfoRow } from "../../components/infoRow/InfoRow";
import AuthController from "../../controller/AuthController";
import { ButtonClass, ButtonType } from "../../enums/Button";
import { InputType } from "../../enums/Input";
import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import Router from "../../router/Router";
import connect from "../../utils/HOC/connect";
import "./userProfilePage.css";
import userProfilePage from "./userProfilePage.hbs?raw";

const buttonChangePassword = new Button({
  type: ButtonType.BUTTON,
  label: "Изменить пароль",
  class: ButtonClass.SECONDARY,
  events: {
    click: {
      cb: () => Router.go(Routes.CHANGEPASSWORD),
    },
  },
});

const buttonChangeUserInfo = new Button({
  type: ButtonType.BUTTON,
  label: "Изменить данные",
  class: ButtonClass.SECONDARY,
  events: {
    click: {
      cb: () => Router.go(Routes.CHANGEPROFILE),
    },
  },
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

const buttonBack = new Button({
  type: ButtonType.BUTTON,
  icon: "fa-solid fa-arrow-left",
  events: {
    click: {
      cb: () => Router.go(Routes.CHAT),
    },
  },
});

const profileFields = {
  email: "Почта",
  login: "Логин",
  first_name: "Имя",
  second_name: "Фамилия",
  display_name: "Имя в чате",
  phone: "Телефон",
};

const input = Object.entries(profileFields).map(([key, value]) => {
  return new InfoRow({
    infoName: value,
    type: InputType.TEXT,
    isEditable: false,
    name: key,
    placeholder: value,
  });
});

class UserProfilePage extends Block<IBlockProps> {
  constructor(props?: IBlockProps) {
    props = {
      input,
      buttonChangePassword,
      buttonChangeUserInfo,
      buttonLogout,
      buttonBack,
    };
    super(props);
  }

  componentDidMount(): void {}

  render(): DocumentFragment {
    return this.compile(userProfilePage, this.props);
  }
}

export default connect(UserProfilePage as typeof Block);
