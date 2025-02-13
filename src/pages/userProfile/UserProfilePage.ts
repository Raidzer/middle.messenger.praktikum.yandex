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
import { IUserData } from "../../api/AuthAPI/IAuthAPI";
import { isEqual } from "../../utils/utils";

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

  async init(): Promise<void> {
    await AuthController.getUser();

    (this.children.input as InfoRow[]).forEach((el) => {
      const inputName = el.props.name as keyof IUserData;

      if (!inputName) {
        return;
      }

      const userInfo = this.props.user as IUserData;

      if (!userInfo) {
        return;
      }

      if (inputName in userInfo) {
        el.setProps({ value: userInfo[inputName] as string });
      }
    });
  }

  componentDidUpdate(oldProps: IBlockProps, newProps: IBlockProps): boolean {
    if (isEqual(oldProps, newProps)) {
      return false;
    }

    (this.children.input as InfoRow[]).forEach((el) => {
      const inputName = el.props.name as keyof IUserData;

      if (!inputName) {
        return;
      }

      const userInfo = newProps.user as IUserData;

      if (!userInfo) {
        return;
      }

      if (inputName in userInfo) {
        el.setProps({ value: userInfo[inputName] as string });
      }
    });
    return true;
  }

  render(): DocumentFragment {
    return this.compile(userProfilePage, this.props);
  }
}

const withUser = connect((state) => ({ user: state.user }));

export default withUser(UserProfilePage as typeof Block);
