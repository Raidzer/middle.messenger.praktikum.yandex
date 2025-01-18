import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import "./changePasswordForm.css";
import changePasswordForm from "./changePasswordForm.hbs"



export class ChangePasswordForm extends Block<IBlockProps> {
  constructor(props: IBlockProps) {
    super("div", props);
  }

  render(): string {
      const element = changePasswordForm(this.props);

      return element;
  }
}
