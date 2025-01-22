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
  value?: string;
}

export default class FormInput extends Block<IFormInputProps> {
  private _value: string = "";

  constructor(props: IFormInputProps) {
    super(props);
    this._value = props.value ?? "";
    this.props.events = {
      change: (event) => {
        const input = event.target as HTMLInputElement;
        const value = input.value;

        this._value = value;
      },
    };

    if (props.validate) {
      this.props.events = {
        ...this.props.events,
        focusout: () => {
          this.inputValidate();
        },
      };
    }
  }

  private _validate(value: string): boolean {
    const rule = this.props.validate?.rule;
    const errorMessage = this.props.validate?.errorMessage;

    if (!rule || !errorMessage) {
      return true;
    }

    if (!rule.test(value)) {
      this.props.error = errorMessage;
      return false;
    }

    this.props.error = "";
    return true;
  }

  inputValidate(): boolean {
    return this._validate(this._value);
  }

  render(): DocumentFragment {
    return this.compile(formInput, { ...this.props, value: this._value });
  }
}
