import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import messageCard from "./messageCard.hbs?raw";

interface IMessageCardProps extends IBlockProps {
  name: string;
  lastMessageText: string;
  lastMessageDate: string;
  countUnreadMessage: string;
}

export default class MessageCard extends Block<IMessageCardProps> {
  constructor(props: IMessageCardProps) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(messageCard, this.props);
  }
}
