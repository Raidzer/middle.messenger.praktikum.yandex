import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import ChatWindow from "../../components/chatWindow/chatWindow";
import "./messagePage.css";
import messagePage from "./messagePage.hbs?raw";
import ChatsController from "../../controller/ChatsController";
import UserSearchList from "../../components/userSearchList/UserSearchList";
import store from "../../store/Store";

const userSearchList = new UserSearchList({});
const chatWindow = new ChatWindow({});

export class MessagePage extends Block<IBlockProps> {
  constructor(props?: IBlockProps) {
    props = {
      userSearchList,
      chatWindow,
    };
    super(props);
    ChatsController.getChats();
  }

  init(): void {
    const { selectedChat } = store.getState();

    if (!selectedChat) {
      chatWindow.hide();
    }
  }

  render(): DocumentFragment {
    return this.compile(messagePage, this.props);
  }
}
