import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import button from "./button.hbs?raw";
import "./button.css";
import { ButtonClass, ButtonType } from "../../enums/Button";

interface IButtonProps extends IBlockProps {
  type?: ButtonType;
  class?: ButtonClass;
  label?: string;
}

export default class Button extends Block<IButtonProps> {
  constructor(props: IButtonProps) {
    super(props);
  }

  render() {
    return this.compile(button, this.props);
  }
}
