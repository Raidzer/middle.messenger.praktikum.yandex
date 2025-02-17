import Block from "../Block/Block";
import IInputProps from "./IInput";

export default abstract class Input extends Block<IInputProps> {
  private _value: string = "";

  constructor(props: IInputProps) {
    super(props);
    this._value = props.value ?? "";
    this.props.events = {
      input: {
        cb: (event) => {
          const input = event.target as HTMLInputElement;
          const value = input.value;

          this._value = value;
        },
      },
    };

    if (props.validate) {
      this.props.events = {
        ...this.props.events,
        blur: {
          cb: () => {
            this.inputValidate();
          },
          option: true,
        },
      };
    }
  }

  get value(): string {
    return this._value;
  }

  clearValue() {
    this._value = "";
    this.setProps({ value: "", error: null });
    this.render();
  }

  private _validate(value: string): boolean {
    const rule = this.props.validate?.rule;
    const errorMessage = this.props.validate?.errorMessage;
    if (!rule || !errorMessage) {
      return true;
    }

    if (!rule.test(value) || value === undefined) {
      if (this.props.error === errorMessage) {
        return false;
      }
      this.props.error = errorMessage;
      return false;
    }

    if (this.props.error !== "") {
      this.props.error = "";
    }
    return true;
  }

  inputValidate(): boolean {
    return this._validate(this._value);
  }

  setValue(value: string) {
    this._value = value;
  }
}
