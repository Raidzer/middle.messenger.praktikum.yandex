import { UserChatPanel } from "./../../components/userChatPanel/userChatPanel";
import { ChatWindow } from "../../components/chatWindow/chatWindow";
import { UserSearchList } from "../../components/userSearchList/UserSearchList";
import render from "../../utils/utils";
import MessageCard from "../../components/messageCard/messageCard";
import { IncomingMessage } from "../../components/chatMessage/ChatMessage";

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

  const chatWindow = new ChatWindow({
    messages,
    events: {
      submit: {
        cb: (event) => {
          event.preventDefault();

          const form = event.target;
          if (!form || !(form instanceof HTMLFormElement)) {
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
