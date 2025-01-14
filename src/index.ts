import Block from "./utils/Block/Block";
import { IBlockProps } from "./utils/Block/IBlock";

class Button extends Block {
  constructor(props: IBlockProps) {
    super("button", props);
  }

  render() {
    return `<div>${this.props.text}</div>`;
  }
}

function render(query: string, block: Block): Element | null {
  const root = document.querySelector(query);
  const child = block.getContent();

  if (!root || !child) {
    return null;
  }

  root.appendChild(child);
  return root;
}

const test = () => {
  console.log(123)
}

const test1 = () => {
  console.log(321)
}

const button = new Button({
  text: "Click me",
  events: {
    click: (event) => {
      console.log(event);
    },
  },
});

render(".root", button);

setTimeout(() => {
  button.setProps({
    text: "Click me, please",
    events: {
      click: () => {
        console.log("event");
      },
    },
  });
}, 1000);

button.show();
