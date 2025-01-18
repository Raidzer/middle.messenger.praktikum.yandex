import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import button from "./button.hbs";
import "./button.css";
import { ButtonClass, ButtonType } from "../../enums/Button";


interface IButtonProps extends IBlockProps {
  type?: ButtonType;
  class?: ButtonClass;
  label?: string;
}

export default class Button extends Block<IButtonProps> {
  constructor(props: IButtonProps) {
    super("div", props);
  }

  render() {
    const element = button(this.props);
    return element;
  }
}
