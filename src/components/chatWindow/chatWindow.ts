import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import chatWindow from "./chatWindow.hbs?raw";
import "./chatWindow.css";
import Button from "../button/Button";
import { ButtonClass, ButtonType } from "../../enums/Button";
import ChatsAPI from "../../api/ChatsAPI/ChatsAPI";
import FormInput from "../formInput/FormInput";
import { InputType } from "../../enums/Input";
import connect from "../../utils/HOC/connect";
import {
  IMessagesData,
  ISendMessageData,
} from "../../controller/MessagesController/IMessagesController";
import { ChatMessage } from "../chatMessage/ChatMessage";
import { MessageType } from "../../enums/Message";
import MessagesController from "../../controller/MessagesController/MessagesController";

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
});

class ChatWindow extends Block<IBlockProps> {
  constructor(props?: IBlockProps) {
    props = {
      messages: [],
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

            const formValues: ISendMessageData = {
              content: messageInput.value,
              type: MessageType.Message,
            };

            console.log(formValues);
            MessagesController.sendMessage(formValues);
            messageInput.setProps({ value: "" });
          },
        },
      },
      ...props,
    };
    super(props);
  }

  componentDidUpdate(oldProps: IBlockProps, newProps: IBlockProps): boolean {
    const messages = newProps.messages as IMessagesData[];
    if (messages) {
      this.children.messages = messages.map((message) => {
        const messageEl = new ChatMessage({
          content: message.content,
          isIncoming: false,
        }) as Block<IBlockProps>;
        return messageEl;
      });
      this.show();
    }
    return true;
  }

  render(): DocumentFragment {
    return this.compile(chatWindow, this.props);
  }

  show(): void {
    if (!this.element || !this.props.idSelectedChat) {
      return;
    }
    this.element.style.display = "flex";
  }

  hide(): void {
    if (!this.element) {
      return;
    }
    this.element.style.display = "none";
  }
}

const withMessagesAndChatId = connect((state) => ({
  messages: state.messages,
  idSelectedChat: state.idSelectedChat,
}));

export default withMessagesAndChatId(ChatWindow as typeof Block);
