import Button from "./components/Button/Button.ts";
import { ButtonClass } from "./enums/Button.ts";
import render from "./utils/utils.ts";

const button = new Button({
  label: "Жамай",
  type: "button",
  class: ButtonClass.PRIMARY,
  events: {
    click: () => {
      console.log("Раааано");
    },
  },
});

const button2 = new Button({
  label: "Жамай2",
  type: "button",
  class: ButtonClass.SECONDARY,
  events: {
    click: () => {
      console.log("Сюда не жамай");
    },
  },
});

render(".root", [button, button2]);

setTimeout(() => {
  let count = 0;
  button.setProps({
    label: "Не жди, жамай!",
    events: {
      click: () => {
        count++;
        button.setProps({
          label: `${count}`,
        });
      },
    },
  });
}, 3000);

button.show();
