import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import message from "./message.hbs?raw";
import "./message.css";
import { UserSearchList } from "../userSearchList/UserSearchList";
import { ChatWindow } from "../chatWindow/chatWindow";

const userSearchList = new UserSearchList({});

const chatWindow = new ChatWindow({});

export class Message extends Block<IBlockProps> {
  constructor(props: IBlockProps) {
    super({ ...props, userSearchList, chatWindow });
  }

  render(): DocumentFragment {
    return this.compile(message, this.props);
  }
}
