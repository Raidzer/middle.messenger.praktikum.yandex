import { IBlockProps } from "../../models/Block/IBlock";
import IInputProps from "../../models/Input/IInput";
import Input from "../../models/Input/Input";
import "./infoRow.css";
import infoRow from "./infoRow.hbs?raw";
export class InfoRow extends Input {
  constructor(props: IInputProps) {
    super(props);
  }

  componentDidUpdate(oldProps: IBlockProps, newProps: IBlockProps): boolean {
    const value = newProps.value;

    if (typeof value === "string") {
      this.setValue(value);
    }

    return true;
  }

  render(): DocumentFragment {
    return this.compile(infoRow, this.props);
  }
}
