import { UserChatPanel } from "./../../components/userChatPanel/userChatPanel";
import { ChatWindow } from "../../components/chatWindow/chatWindow";
import { UserSearchList } from "../../components/userSearchList/UserSearchList";
import render from "../../utils/utils";
import MessageCard from "../../components/messageCard/messageCard";
import { IncomingMessage } from "../../components/chatMessage/ChatMessage";
import Button from "../../components/button/Button";
import { ButtonType } from "../../enums/Button";
import FormInput from "../../components/formInput/FormInput";
import { InputType } from "../../enums/Input";
import {
  ValidationMessageError,
  ValidationRulesRegExp,
} from "../../utils/validationRules/validationRules";

document.addEventListener("DOMContentLoaded", () => {
  const messageCard = new MessageCard({
    countUnreadMessage: "2",
    lastMessageDate: "22.01.2025",
    lastMessageText: "тест тест тест тест тест",
    name: "Иван",
  });

  const userSearchList = new UserSearchList({ messageCard });

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

  const page = new UserChatPanel({ userSearchList, chatWindow });

  render(".root", [page]);
});
