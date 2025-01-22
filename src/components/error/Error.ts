import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import error from "../../components/error/error.hbs?raw";
import { ButtonClass, ButtonType } from "../../enums/Button";
import Button from "../button/Button";
import "./error.css";

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
    super({ ...props, button });
  }

  render() {
    return this.compile(error, this.props);
  }
}
