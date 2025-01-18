import { InputType } from "../../enums/Input";
import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import "./infoRow.css";
import infoRow from "./infoRow.hbs";

interface IInfoRowProps extends IBlockProps {
  infoName?: string;
  isEditable?: boolean;
  type?: InputType;
  value?: string;
  name?: string;
  placeholder?: string;
  infoData?: string;
}

export class InfoRow extends Block<IInfoRowProps> {
  constructor(props: IInfoRowProps) {
    super("div", props);
  }

  render(): string {
    const element = infoRow(this.props);

    return element;
  }
}
