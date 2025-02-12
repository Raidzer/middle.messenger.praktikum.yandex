import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import { UserSearchList } from "../../components/userSearchList/UserSearchList";
import { ChatWindow } from "../../components/chatWindow/chatWindow";
import "./messagePage.css";
import messagePage from "./messagePage.hbs?raw";
import MessageCard from "../../components/messageCard/messageCard";
import Button from "../../components/button/Button";
import { ButtonType } from "../../enums/Button";
import FormInput from "../../components/formInput/FormInput";
import { InputType } from "../../enums/Input";
import {
  ValidationMessageError,
  ValidationRulesRegExp,
} from "../../utils/validationRules/validationRules";
import { IncomingMessage } from "../../components/chatMessage/ChatMessage";
import Router from "../../router/Router";
import { Routes } from "../../enums/Routes";

interface IMessageProps extends IBlockProps {
  userSearchList?: UserSearchList;
  chatWindow?: ChatWindow;
}

const messageCard = new MessageCard({
  countUnreadMessage: "2",
  lastMessageDate: "22.01.2025",
  lastMessageText: "тест тест тест тест тест",
  name: "Иван",
});

const profile = new Button({
  type: ButtonType.BUTTON,
  label: "Профиль",
  events: {
    click: {
      cb: () => Router.go(Routes.PROFILE),
    },
  },
});

const userSearchList = new UserSearchList({ messageCard, profile });

const messages = [
  new IncomingMessage({ text: "Тест_1", isIncoming: true }),
  new IncomingMessage({ text: "Тест_12", isIncoming: false }),
];

const sendMessage = new Button({
  icon: "fa-solid fa-paper-plane",
  type: ButtonType.SUBMIT,
});

const loadFile = new Button({
  icon: "fas fa-paperclip",
  type: ButtonType.BUTTON,
});

const chatMenu = new Button({
  icon: "fa-solid fa-bars",
  type: ButtonType.BUTTON,
});

const messageInput = new FormInput({
  name: "message",
  type: InputType.TEXT,
  placeholder: "Сообщение",
  class: true,
  validate: {
    rule: ValidationRulesRegExp.NoEmpty,
    errorMessage: ValidationMessageError.NoEmpty,
  },
});

const chatWindow = new ChatWindow({
  messages,
  sendMessage,
  loadFile,
  chatMenu,
  messageInput,
  events: {
    submit: {
      cb: (event) => {
        event.preventDefault();

        const form = event.target;
        if (!form || !(form instanceof HTMLFormElement)) {
          return;
        }

        const dataValid = messageInput.inputValidate();
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
  },
});

chatWindow.setProps({
  messages: new IncomingMessage({ text: "Тест_123", isIncoming: true }),
});

export class MessagePage extends Block<IMessageProps> {
  constructor(props?: IMessageProps) {
    props = {
      userSearchList,
      chatWindow,
    };
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(messagePage, this.props);
  }
}
