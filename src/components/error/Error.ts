import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import error from "../../components/error/error.hbs";
import { ButtonClass, ButtonType } from "../../enums/Button";
import Button from "../button/Button";
import "./error.css"

interface IErrorProps extends IBlockProps {
  codeError: string;
  description: string;
}

const button = new Button({
  class: ButtonClass.SECONDARY,
  type: ButtonType.BUTTON,
  label: "На главную",
});

export default class Error extends Block<IErrorProps> {
  constructor(props: IErrorProps) {
    super("div", props);
    this.props.button = button.render();
  }

  render() {
    const element = error(this.props);
    return element;
  }
}
