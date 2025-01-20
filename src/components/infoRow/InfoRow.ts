import { InputType } from "../../enums/Input";
import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import "./infoRow.css";
import infoRow from "./infoRow.hbs?raw";

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
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(infoRow, this.props);
  }
}
