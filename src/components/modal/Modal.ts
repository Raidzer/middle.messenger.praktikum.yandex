import UsersController from "../../controller/UsersController";
import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import Button from "../button/Button";
import "./modal.css";
import modal from "./modal.hbs?raw";

class Modal extends Block<IBlockProps> {
  constructor(props: IBlockProps) {
    super(props);
  }

  init(): void {
    this.children.buttonClose = [
      new Button({
        icon: "fa-solid fa-xmark",
        events: {
          click: {
            cb: () => {
              this.hide();
              const inputs = this.children.input;
              UsersController.clearSearchUser();
              if (inputs) {
                inputs.forEach((input) => input.setProps({ value: "" }));
              }
            },
          },
        },
      }),
    ];
  }

  show(): void {
    this.setProps({ isOpen: true });
  }

  hide(): void {
    this.setProps({ isOpen: false });
  }

  render(): DocumentFragment {
    return this.compile(modal, this.props);
  }
}

export default Modal;
