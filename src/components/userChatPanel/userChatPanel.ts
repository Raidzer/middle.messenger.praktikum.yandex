import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import message from "./userChatPanel.hbs?raw";
import "./userChatPanel.css";
import { UserSearchList } from "../userSearchList/UserSearchList";
import { ChatWindow } from "../chatWindow/chatWindow";

interface IMessageProps extends IBlockProps {
  userSearchList: UserSearchList;
  chatWindow: ChatWindow;
}

export class UserChatPanel extends Block<IMessageProps> {
  constructor(props: IMessageProps) {
    super(props);
   // this.children.chatWindow.hide();
  }

  render(): DocumentFragment {
    return this.compile(message, this.props);
  }
}
