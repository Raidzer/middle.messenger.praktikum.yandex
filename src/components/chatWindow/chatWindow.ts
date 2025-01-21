import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import chatWindow from "./chatWindow.hbs?raw";
import "./chatWindow.css";

export class ChatWindow extends Block<IBlockProps> {
  constructor(props: IBlockProps) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(chatWindow, this.props);
  }
}
