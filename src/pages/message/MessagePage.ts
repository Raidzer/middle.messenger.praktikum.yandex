import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import ChatWindow from "../../components/chatWindow/chatWindow";
import "./messagePage.css";
import messagePage from "./messagePage.hbs?raw";
import UserSearchList from "../../components/userSearchList/UserSearchList";
import ChatsController from "../../controller/ChatsController";
import AuthController from "../../controller/AuthController";

const userSearchList = new UserSearchList({});
const chatWindow = new ChatWindow({});

export class MessagePage extends Block<IBlockProps> {
  constructor(props?: IBlockProps) {
    props = {
      userSearchList,
      chatWindow,
    };
    super(props);
  }

  async init(): Promise<void> {
    await AuthController.getUser();
    await ChatsController.getChats();
  }

  async show() {
    if (!this.element) {
      return;
    }
    await ChatsController.getChats();
    this.element.style.display = "flex";
  }

  render(): DocumentFragment {
    return this.compile(messagePage, this.props);
  }
}
