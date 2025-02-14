import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import chatWindow from "./chatWindow.hbs?raw";
import "./chatWindow.css";
import Button from "../button/Button";
import { ButtonClass, ButtonType } from "../../enums/Button";
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
import ChatsController from "../../controller/ChatsController";
import Modal from "../modal/Modal";
import {
  ValidationMessageError,
  ValidationRulesRegExp,
} from "../../utils/validationRules/validationRules";
import UsersController from "../../controller/UsersController";
import { isEqual } from "../../utils/utils";

const sendMessage = new Button({
  icon: "fa-solid fa-paper-plane",
  type: ButtonType.SUBMIT,
});

const loadFile = new Button({
  icon: "fas fa-paperclip",
  type: ButtonType.BUTTON,
});

const messageInput = new FormInput({
  name: "message",
  type: InputType.TEXT,
  placeholder: "Сообщение",
  class: true,
});

const userSearch = new FormInput({
  name: "userSearch",
  type: InputType.TEXT,
  placeholder: "Введите имя пользователя",
  validate: {
    rule: ValidationRulesRegExp.NoEmpty,
    errorMessage: ValidationMessageError.NoEmpty,
  },
});

const buttonSubmit = new Button({
  type: ButtonType.BUTTON,
  label: "Искать пользователя",
  events: {
    click: {
      cb: async () => {
        const login = userSearch.value;

        if (login) {
          await UsersController.searchUserByLogin({ login });
        }
      },
    },
  },
});

const modal = new Modal({
  input: [userSearch],
  buttonSubmit: [buttonSubmit],
});

class ChatWindow extends Block<IBlockProps> {
  constructor(props?: IBlockProps) {
    props = {
      messages: [],
      sendMessage,
      loadFile,
      messageInput,
      modal,
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

    this.children.buttonDeleteChat = [
      new Button({
        class: ButtonClass.SECONDARY,
        label: "Удалить чат",
        type: ButtonType.BUTTON,
        events: {
          click: {
            cb: async () => {
              const chatId = this.props.chatId;

              if (typeof chatId === "number") {
                await ChatsController.deleteChat({ chatId });
                this.hide();
              }
            },
          },
        },
      }),
    ];

    this.children.buttonAddUser = [
      new Button({
        class: ButtonClass.SECONDARY,
        label: "Добавить пользователя",
        type: ButtonType.BUTTON,
        events: {
          click: {
            cb: () => modal.show(),
          },
        },
      }),
    ];
  }

  componentDidUpdate(oldProps: IBlockProps, newProps: IBlockProps): boolean {
    if (isEqual(oldProps, newProps)) {
      return true;
    }
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

    const userSearchList = newProps.userSearchList;
    console.log(
      "🚀 ~ ChatWindow ~ componentDidUpdate ~ userSearchList:",
      userSearchList
    );

    return true;
  }

  render(): DocumentFragment {
    return this.compile(chatWindow, { ...this.props });
  }

  show(): void {
    if (!this.element) {
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
  title: state.selectedChat?.title,
  chatId: state.selectedChat?.id,
}));

export default withMessagesAndChatId(ChatWindow as typeof Block);
