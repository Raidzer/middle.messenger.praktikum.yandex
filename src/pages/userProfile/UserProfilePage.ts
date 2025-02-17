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
import {
  ValidationMessageError,
  ValidationRulesRegExp,
} from "../../utils/validationRules/validationRules";
import UsersController from "../../controller/UsersController";
import { IUserChangeData } from "../../api/UsersAPI/IUsersApi";
import store from "../../store/Store";
import UserAvatar from "../../components/userAvatar/UserAvatar";
import Modal from "../../components/modal/Modal";
import UploadFileInput from "../../components/uploadFileInput/UploadFileInput";
import ChatsController from "../../controller/ChatsController";

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
      cb: async () => {
        await ChatsController.getChats();
        Router.go(Routes.CHAT);
      },
    },
  },
});

const buttonSaveChange = new Button({
  type: ButtonType.SUBMIT,
  label: "Сохранить изменения",
  class: ButtonClass.PRIMARY,
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
  const typedKey = key as keyof typeof profileFields;

  return new InfoRow({
    infoName: value,
    type: InputType.TEXT,
    isEditable: false,
    name: key,
    placeholder: value,
    validate: {
      rule: ValidationRulesRegExp[typedKey],
      errorMessage: ValidationMessageError[typedKey],
    },
  });
});

const buttonChangeUserInfo = new Button({
  type: ButtonType.BUTTON,
  label: "Изменить данные",
  class: ButtonClass.SECONDARY,
  events: {
    click: {
      cb: () => {
        input.forEach((el) => {
          el.setProps({ isEditable: true });
        });
        buttonChangePassword.hide();
        buttonLogout.hide();
        buttonChangeUserInfo.hide();
        buttonSaveChange.show();
      },
    },
  },
});

const userAvatar = new UserAvatar({
  events: {
    click: {
      cb: () => modal.show(),
    },
  },
});

const buttonChangeAvatar = new Button({
  class: ButtonClass.PRIMARY,
  label: "Изменить аватар",
  type: ButtonType.BUTTON,
  events: {
    click: {
      cb: async () => {
        const avatar = inputAvatar.value;

        if (avatar) {
          await UsersController.changeUserAvatar(avatar);
        }
        modal.hide();
      },
    },
  },
});

const inputAvatar = new UploadFileInput({});

const modal = new Modal({
  buttonAction: [buttonChangeAvatar],
  input: [inputAvatar],
});

class UserProfilePage extends Block<IBlockProps> {
  constructor(props?: IBlockProps) {
    props = {
      input,
      buttonChangePassword,
      buttonChangeUserInfo,
      buttonLogout,
      buttonBack,
      buttonSaveChange,
      userAvatar,
      modal,
      events: {
        submit: {
          cb: async (event: SubmitEvent) => {
            event.preventDefault();

            let valid = true;

            input.forEach((el) => {
              if (!el.inputValidate()) {
                valid = false;
              }
            });

            if (valid) {
              const form = event.target as HTMLFormElement;
              if (!form) {
                return;
              }
              const formData = new FormData(form);

              const formValues: IUserChangeData = {
                first_name: "",
                second_name: "",
                display_name: "",
                phone: "",
                login: "",
                avatar: "",
                email: "",
              };

              formData.forEach((value, key) => {
                if (key in formValues) {
                  formValues[key as keyof IUserChangeData] = value as string;
                }
              });

              await UsersController.changeUserInfo(formValues);
              const { user } = store.getState();
              this.setProps({ user });
              input.forEach((el) => {
                el.setProps({ isEditable: false });
              });
              buttonSaveChange.hide();
              buttonChangePassword.show();
              buttonChangeUserInfo.show();
              buttonLogout.show();
            }
          },
        },
      },
    };
    super(props);
  }

  async init(): Promise<void> {
    await AuthController.getUser();
    const { user } = store.getState();
    (this.children.input as InfoRow[]).forEach((el) => {
      const inputName = el.props.name as keyof IUserData;

      if (!inputName) {
        return;
      }

      const userInfo = user as IUserData;

      if (!userInfo) {
        return;
      }

      if (inputName in userInfo) {
        el.setProps({ value: userInfo[inputName] as string });
      }
    });
    buttonSaveChange.hide();
  }

  componentDidUpdate(oldProps: IBlockProps, newProps: IBlockProps): boolean {
    console.log(
      "🚀 ~ UserProfilePage ~ componentDidUpdate ~ newProps:",
      newProps
    );
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

  show() {
    if (!this.element) {
      return;
    }
    const { user } = store.getState();
    this.setProps({ user });
    this.element.style.display = "flex";
  }

  hide() {
    if (!this.element) {
      return;
    }
    input.forEach((el) => {
      el.setProps({ isEditable: false });
    });
    buttonSaveChange.hide();
    buttonChangePassword.show();
    buttonChangeUserInfo.show();
    buttonLogout.show();
    this.element.style.display = "none";
  }

  render(): DocumentFragment {
    return this.compile(userProfilePage, this.props);
  }
}

const withUser = connect((state) => ({ user: state.user }));

export default withUser(UserProfilePage as typeof Block);
