import { RegisterForm } from "../../components/registerForm/RegisterForm";
import render from "../../utils/utils";

const registerForm = new RegisterForm({});

render(".root", [registerForm]);
