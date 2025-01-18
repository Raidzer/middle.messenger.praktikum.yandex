import Error from "../../components/error/Error";
import render from "../../utils/utils";
import "../../components/error/error.css";

const errorElement = new Error({
  codeError: "404",
  description: "Не туда попали",
});

render(".root", [errorElement]);
