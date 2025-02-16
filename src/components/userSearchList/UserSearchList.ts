import { IChatData } from "./../../api/ChatsAPI/IChatsAPI";
import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import userSearchList from "./userSearchList.hbs?raw";
import "./userSearchList.css";
import connect from "../../utils/HOC/connect";
import Button from "../button/Button";
import { ButtonClass, ButtonType } from "../../enums/Button";
import Router from "../../router/Router";
import { Routes } from "../../enums/Routes";
import MessageCard from "../messageCard/messageCard";
import AuthController from "../../controller/AuthController";
import Modal from "../modal/Modal";
import FormInput from "../formInput/FormInput";
import { InputType } from "../../enums/Input";
import {
  ValidationMessageError,
  ValidationRulesRegExp,
} from "../../utils/validationRules/validationRules";
import ChatsController from "../../controller/ChatsController";

interface IUserSearchList extends IBlockProps {
  children: {
    messagesCard: MessageCard[];
  };
}

const chatMenu = new Button({
  type: ButtonType.BUTTON,
  class: ButtonClass.PRIMARY,
  label: "Добавить чат",
  events: {
    click: {
      cb: () => {
        modal.setProps({ isOpen: true });
      },
    },
  },
});

const profile = new Button({
  type: ButtonType.BUTTON,
  label: "Профиль",
  events: {
    click: {
      cb: async () => {
        await AuthController.getUser();
        Router.go(Routes.PROFILE);
      },
    },
  },
});

const nameChat = new FormInput({
  name: "nameChat",
  type: InputType.TEXT,
  placeholder: "Название чата",
  validate: {
    rule: ValidationRulesRegExp.NoEmpty,
    errorMessage: ValidationMessageError.NoEmpty,
  },
});

const addChat = new Button({
  type: ButtonType.BUTTON,
  label: "Создать чат",
  events: {
    click: {
      cb: async () => {
        if (nameChat.inputValidate()) {
          await ChatsController.createChat({ title: nameChat.value });
          modal.setProps({ isOpen: false });
          nameChat.setProps({ value: "" });
        }
      },
    },
  },
});

const modal = new Modal({
  input: [nameChat],
  buttonSubmit: [addChat],
});

class UserSearchList extends Block<IUserSearchList> {
  constructor(props?: IUserSearchList) {
    props = {
      profile,
      chatMenu,
      modal,
      children: {
        messagesCard: [],
      },
    };
    super(props);
    this.children.messagesCard = [];
  }

  componentDidUpdate(oldProps: IBlockProps, newProps: IBlockProps): boolean {
    const chats = newProps.chats as IChatData[];
    if (chats) {
      this.children.messagesCard = [];
      chats.forEach((chat) => {
        const isSelectedChat =
          this.props.selectChatId !== null &&
          chat.id === this.props.selectChatId;
        const messageCard = new MessageCard({
          title: chat.title,
          last_message: chat.last_message?.content,
          id: chat.id,
          unread_count: chat.unread_count,
          isSelect: isSelectedChat,
        }) as Block<IBlockProps>;
        this.children.messagesCard.push(messageCard);
      });
    }

    return true;
  }

  render(): DocumentFragment {
    return this.compile(userSearchList, this.props);
  }
}

const withChat = connect((state) => ({
  chats: state.chats,
  selectChatId: state.selectedChat?.id,
}));

export default withChat(UserSearchList as typeof Block);
