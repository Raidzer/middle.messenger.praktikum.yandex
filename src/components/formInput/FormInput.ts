import formInput from "./formInput.hbs?raw";
import "./formInput.css";
import Input from "../../models/Input/Input";
import IInputProps from "../../models/Input/IInput";

export default class FormInput extends Input {
  constructor(props: IInputProps) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(formInput, { ...this.props, value: this.value });
  }
}
