import Button from "../../components/button/Button";
import { ButtonClass, ButtonType } from "../../enums/Button";
import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import error500Page from "./error500Page.hbs?raw";
import "./error500Page.css";
import Router from "../../router/Router";
import { Routes } from "../../enums/Routes";

interface IErrorProps extends IBlockProps {
  codeError?: string;
  description?: string;
}

const button = new Button({
  class: ButtonClass.SECONDARY,
  type: ButtonType.BUTTON,
  label: "На главную",
  events: {
    click: {
      cb: () => Router.go(Routes.LOGIN),
    },
  },
});

export class Error500Page extends Block<IErrorProps> {
  constructor(props?: IErrorProps) {
    super({
      ...props,
      button,
      codeError: "500",
      description: "Мы уже фиксим",
    });
  }

  render() {
    return this.compile(error500Page, this.props);
  }
}
