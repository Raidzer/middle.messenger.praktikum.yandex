import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import userRow from "./userRow.hbs?raw";
import "./userRow.css";
import store from "../../store/Store";

export default class UserRow extends Block<IBlockProps> {
  constructor(props: IBlockProps) {
    super(props);
  }

  init(): void {
    this.props.events = {
      click: {
        cb: () => store.set("selectedUser", this.props.user),
      },
    };
  }

  render(): DocumentFragment | string {
    return this.compile(userRow, this.props);
  }
}
