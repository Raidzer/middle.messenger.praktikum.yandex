import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import messageCard from "./messageCard.hbs?raw";
import "./messageCard.css";

interface IMessageCardProps extends IBlockProps {
  id?: number;
  title: string;
  last_message: string;
  unread_count: number;
}

export default class MessageCard extends Block<IMessageCardProps> {
  constructor(props: IMessageCardProps) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(messageCard, this.props);
  }
}
