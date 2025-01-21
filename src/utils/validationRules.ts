export const ValidationRulesRegExp = {
  Name: /^[A-ZА-Я][a-zа-я-]*$/,
  Login: /^(?!\\d+$)[A-Za-z\\d_-]{3,20}$/,
  Email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$/,
  Password: /^(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,40}$/,
  Phone: /^\\+?\\d{10,15}$/,
  NoEmpty: /^.+$/,
};

export const ValidationMessageError = {
  Name: "",
  Login:
    "Логин от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание).",
  Email: "",
  Password: "",
  Phone: "",
  NoEmpty: "",
};
