import Button from "./components/Button/Button.ts";
import { ButtonClass, ButtonType } from "./enums/Button.ts";
import render from "./utils/utils.ts";

const testButton = new Button({
  type: ButtonType.BUTTON,
  label: "Сохранить изменения",
  class: ButtonClass.PRIMARY,
  events: {
    click: () => {
        console.log("победа")
    }
}
});

setTimeout(() => {
  console.log("time");
  testButton.setProps({
    label: "Сохранись 321",
    events: {
        click: () => {
            console.log("победа")
        }
    }
  });
}, 3000);

setTimeout(() => {
    console.log("time");
    testButton.setProps({
      label: "Сохранись 123",
      events: {
          click: () => {
              console.log("победа321")
          }
      }
    });
  }, 6000);

render(".root", [testButton]);
