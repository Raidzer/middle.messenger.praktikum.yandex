import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import "./userInfoFrom.css";
import changePasswordForm from "./userInfoForm.hbs"



export class ChangePasswordForm extends Block<IBlockProps> {
  constructor(props: IBlockProps) {
    super("div", props);
  }

  render(): string {
      const element = changePasswordForm(this.props);

      return element;
  }
}
