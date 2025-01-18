import { InputType } from "../../enums/Input";
import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import formInput from "./formInput.hbs";
import "./formInput.css";

interface IFormInputProps extends IBlockProps {
  name?: string;
  type?: InputType;
  placeholder?: string;
}

export default class FormInput extends Block<IFormInputProps> {
  constructor(props: IFormInputProps) {
    super("div", props);
  }

  render(): string {
    const element = formInput(this.props);
    return element;
  }
}
