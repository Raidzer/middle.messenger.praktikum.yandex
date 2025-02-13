import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import "./userInfoFrom.css";
import userInfo from "./userInfoForm.hbs?raw";

export class userInfoForm extends Block<IBlockProps> {
  constructor(props: IBlockProps) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(userInfo, this.props);
  }
}
