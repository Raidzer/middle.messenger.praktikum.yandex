import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import loginForm from "./baseAuthForm.hbs?raw";
import "./baseAuthForm.css";

interface IBaseAuthFormPros extends IBlockProps {
  title: string;
}

export class BaseAuthForm extends Block<IBaseAuthFormPros> {
  constructor(props: IBaseAuthFormPros) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(loginForm, this.props);
  }
}
