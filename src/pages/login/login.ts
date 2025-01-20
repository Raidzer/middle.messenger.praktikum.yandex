import { LoginForm } from "../../components/loginForm/LoginForm";
import render from "../../utils/utils";
import "../../styles/styles.css";

const loginForm = new LoginForm({});

render(".root", [loginForm]);
