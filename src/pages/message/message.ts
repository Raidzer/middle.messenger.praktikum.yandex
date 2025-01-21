import { ChatWindow } from "../../components/chatWindow/chatWindow";
import { Message } from "../../components/message/message";
import { UserSearchList } from "../../components/userSearchList/UserSearchList";
import render from "../../utils/utils";

const userSearchList = new UserSearchList({});

const chatWindow = new ChatWindow({
  events: {
    submit: (event) => {
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
});

const page = new Message({ userSearchList, chatWindow });

userSearchList.setProps({
  events: {
    click: () => {
      chatWindow.show();
    },
  },
});

render(".root", [page]);
