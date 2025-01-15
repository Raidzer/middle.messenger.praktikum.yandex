import Button from "./components/Button/Button.ts";
import { ButtonClass } from "./enums/Button.ts";
import render from "./utils/utils.ts";

const button = new Button({
  label: "Жамай",
  type: "button",
  class: ButtonClass.PRIMARY,
  events: {
    click: (event) => {
      console.log(event);
    },
  },
});

render(".root", button);

setTimeout(() => {
  button.setProps({
    label: "Не жди, жамай!",
    events: {
      click: () => {
        console.log("event");
      },
    },
  });
}, 1000);

button.show();
