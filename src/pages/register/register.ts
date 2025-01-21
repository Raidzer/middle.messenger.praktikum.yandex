import { RegisterForm } from "../../components/registerForm/RegisterForm";
import render from "../../utils/utils";

const registerForm = new RegisterForm({
  events: {
    submit: (event) => {
      event.preventDefault();

      const form = event.target;
      if (!form || !(form instanceof HTMLFormElement)) {
        return;
      }

      const formData = new FormData(form);

      const formDataObj: Record<string, string> = {};
      formData.forEach((value, key) => {
        formDataObj[key] = value as string;
      });

      console.table(formDataObj);
    },
  },
});

render(".root", [registerForm]);
