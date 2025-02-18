import UsersController from "../../controller/UsersController";
import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import Input from "../../models/Input/Input";
import { isEqual } from "../../utils/utils";
import Button from "../button/Button";
import "./modal.css";
import modal from "./modal.hbs?raw";

interface IModalProps extends IBlockProps {
  buttonAction?: Button[];
  input?: Input[] | Block[];
}

class Modal extends Block<IModalProps> {
  constructor(props: IModalProps) {
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

  componentDidUpdate(oldProps: IBlockProps, newProps: IBlockProps): boolean {
    if (isEqual(oldProps, newProps)) {
      return false;
    }
    const newButtonAction = newProps.buttonAction;

    if (
      Array.isArray(newButtonAction) &&
      newButtonAction.every((item) => item instanceof Button)
    ) {
      this.children.buttonAction = newButtonAction;
    }

    const newInput = newProps.input;

    if (
      Array.isArray(newInput) &&
      newInput.every((item) => item instanceof Input || Block)
    ) {
      this.children.input = newInput;
    }

    return true;
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
