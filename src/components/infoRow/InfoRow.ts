import IInputProps from "../../models/Input/IInput";
import Input from "../../models/Input/Input";
import "./infoRow.css";
import infoRow from "./infoRow.hbs?raw";
export class InfoRow extends Input {
  constructor(props: IInputProps) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(infoRow, { ...this.props });
  }
}
