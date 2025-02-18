import formInput from "./formInput.hbs?raw";
import "./formInput.css";
import Input from "../../models/Input/Input";
import IInputProps from "../../models/Input/IInput";
import { IBlockProps } from "../../models/Block/IBlock";
import { isEqual } from "../../utils/utils";

export default class FormInput extends Input {
  constructor(props: IInputProps) {
    super(props);
  }

  componentDidUpdate(oldProps: IBlockProps, newProps: IBlockProps): boolean {
    if (isEqual(oldProps, newProps)) {
      return true;
    }
    return true;
  }

  render(): DocumentFragment {
    return this.compile(formInput, { ...this.props, value: this.value });
  }
}
