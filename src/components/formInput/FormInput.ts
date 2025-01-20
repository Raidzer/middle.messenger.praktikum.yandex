import { InputType } from "../../enums/Input";
import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import formInput from "./formInput.hbs?raw";
import "./formInput.css";

interface IFormInputProps extends IBlockProps {
  name?: string;
  type?: InputType;
  placeholder?: string;
}

export default class FormInput extends Block<IFormInputProps> {
  constructor(props: IFormInputProps) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(formInput, this.props);
  }
}
