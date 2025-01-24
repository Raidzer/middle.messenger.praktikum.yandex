import Error from "../../components/error/Error";
import render from "../../utils/utils";
import "../../components/error/error.css";

document.addEventListener("DOMContentLoaded", () => {
  const errorElement = new Error({
    codeError: "500",
    description: "Мы уже фиксим",
  });

  render(".root", [errorElement]);
});
