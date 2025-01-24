import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import "./userProfile.css";
import userProfile from "./userProfile.hbs?raw";

export class UserProfile extends Block<IBlockProps> {
  constructor(props: IBlockProps) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(userProfile, this.props);
  }
}
