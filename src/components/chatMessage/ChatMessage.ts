import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import incomingMessage from "./chatMessage.hbs?raw";
import "./chatMessage.css";

interface IMessageProps extends IBlockProps {
  content: string;
  isIncoming: boolean;
}

export class ChatMessage extends Block<IMessageProps> {
  constructor(props: IMessageProps) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(incomingMessage, this.props);
  }
}
