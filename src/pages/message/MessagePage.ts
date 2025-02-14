import { ButtonClass } from "./../../enums/Button";
import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import { ChatWindow } from "../../components/chatWindow/chatWindow";
import "./messagePage.css";
import messagePage from "./messagePage.hbs?raw";
import Button from "../../components/button/Button";
import { ButtonType } from "../../enums/Button";
import FormInput from "../../components/formInput/FormInput";
import { InputType } from "../../enums/Input";
import {
  ValidationMessageError,
  ValidationRulesRegExp,
} from "../../utils/validationRules/validationRules";
import { IncomingMessage } from "../../components/chatMessage/ChatMessage";
import ChatsController from "../../controller/ChatsController";
import ChatsAPI from "../../api/ChatsAPI/ChatsAPI";
import  UserSearchList  from "../../components/userSearchList/UserSearchList";

interface IMessageProps extends IBlockProps {
  chatWindow?: ChatWindow;
}



const userSearchList = new UserSearchList({});

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
  type: ButtonType.BUTTON,
  class: ButtonClass.PRIMARY,
  label: "Добавить чат",
  events: {
    click: {
      cb: () => ChatsAPI.createChat({ title: "Пробный" }),
    },
  },
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
    ChatsController.getChats();
  }

  render(): DocumentFragment {
    return this.compile(messagePage, this.props);
  }
}
