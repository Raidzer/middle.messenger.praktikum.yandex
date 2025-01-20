import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import loginForm from "./loginForm.hbs?raw";
import "./loginForm.css";

export class LoginForm extends Block<IBlockProps> {
  constructor(props: IBlockProps) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(loginForm, this.props);
  }
}
