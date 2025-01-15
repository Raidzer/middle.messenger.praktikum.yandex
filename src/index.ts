import Button from "./components/Button/Button.ts";
import { ButtonClass } from "./enums/Button.ts";
import render from "./utils/utils.ts";

const button = new Button({
  label: "Жамай",
  type: "button",
  class: ButtonClass.PRIMARY,
  events: {
    click: () => {
      console.log('Раааано');
    },
  },
});

render(".root", button);

let count = 0;
setTimeout(() => {
  button.setProps({
    label: "Не жди, жамай!",
    events: {
      click: () => {
        count++
        button.setProps({
          label: `${count}`
        })
      },
    },
  });
}, 3000);

button.show();
