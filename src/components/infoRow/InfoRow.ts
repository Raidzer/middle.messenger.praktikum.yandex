import { IBlockProps } from "../../models/Block/IBlock";
import IInputProps from "../../models/Input/IInput";
import Input from "../../models/Input/Input";
import { isEqual } from "../../utils/utils";
import "./infoRow.css";
import infoRow from "./infoRow.hbs?raw";
export class InfoRow extends Input {
  constructor(props: IInputProps) {
    super(props);
  }

  init(): void {}

  componentDidUpdate(oldProps: IBlockProps, newProps: IBlockProps): boolean {
    if (isEqual(oldProps, newProps)) {
      return false;
    }
    const value = newProps.value;
    const isEditable = this.props.isEditable;

    if (!isEditable && typeof value === "string") {
      this.setValue(value);
    }

    return true;
  }

  render(): DocumentFragment {
    return this.compile(infoRow, { ...this.props, value: this.value });
  }
}
