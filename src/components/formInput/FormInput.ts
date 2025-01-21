import { InputType } from "../../enums/Input";
import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import formInput from "./formInput.hbs?raw";
import "./formInput.css";

interface IValidate {
  rule: RegExp;
  errorMessage: string;
}

interface IFormInputProps extends IBlockProps {
  name?: string;
  type?: InputType;
  placeholder?: string;
  validate?: IValidate;
}

export default class FormInput extends Block<IFormInputProps> {
  constructor(props: IFormInputProps) {
    super(props);

  }

  validate(value: string, rules: RegExp, errorMessage: string): void {
    if (!rules.test(value)) {
      this.props.error = errorMessage;
    } else {
      this.props.error = "";
    }
  }

  render(): DocumentFragment {
    return this.compile(formInput, this.props);
  }
}
