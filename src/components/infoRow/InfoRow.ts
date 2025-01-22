import { InputType } from "../../enums/Input";
import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import "./infoRow.css";
import infoRow from "./infoRow.hbs?raw";

interface IValidate {
  rule: RegExp;
  errorMessage: string;
}

interface IInfoRowProps extends IBlockProps {
  infoName?: string;
  isEditable?: boolean;
  type?: InputType;
  name?: string;
  placeholder?: string;
  infoData?: string;
  validate?: IValidate;
}

export class InfoRow extends Block<IInfoRowProps> {
  private _value: string = "";

  constructor(props: IInfoRowProps) {
    super(props);
    this._value = props.infoData ?? "";

    if (props.isEditable) {
      this.props.events = {
        ...this.props.events,
        input: (event) => {
          const input = event.target as HTMLInputElement;
          const value = input.value;

          this._value = value;
        },
      };
    }

    if (props.validate && props.isEditable) {
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
    return this.compile(infoRow, { ...this.props, value: this._value });
  }
}
