import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import message from "./message.hbs?raw";
import "./message.css";
import { UserSearchList } from "../userSearchList/UserSearchList";
import { ChatWindow } from "../chatWindow/chatWindow";

interface IMessageProps extends IBlockProps {
  userSearchList: UserSearchList;
  chatWindow: ChatWindow;
}

export class Message extends Block<IMessageProps> {
  constructor(props: IBlockProps) {
    super(props);
    this.children.chatWindow.hide();
  }

  render(): DocumentFragment {
    return this.compile(message, this.props);
  }
}
