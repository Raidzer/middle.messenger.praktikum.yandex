import { ChatWindow } from "../../components/chatWindow/chatWindow";
import { Message } from "../../components/message/message";
import { UserSearchList } from "../../components/userSearchList/UserSearchList";
import render from "../../utils/utils";


const userSearchList = new UserSearchList({});

const chatWindow = new ChatWindow({});

const page = new Message({userSearchList, chatWindow});

userSearchList.setProps({
    events: {
        click: () => {
            chatWindow.show();
        }
    }
})

render(".root", [page]);
