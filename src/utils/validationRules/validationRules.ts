export const ValidationRulesRegExp = {
  first_name: /^[A-ZА-Я][a-zа-я-]*$/,
  second_name: /^[A-ZА-Я][a-zа-я-]*$/,
  display_name: /^[A-ZА-Я][a-zа-я-]*$/,
  login: /^(?!\\d+$)[A-Za-z\\d_-]{3,20}$/,
  email: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/,
  password: /(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z]{8,}/,
  phone: /^\+?(\d[ -]?){10,15}$/,
  NoEmpty: /^.+$/,
};

export const ValidationMessageError = {
  first_name:
    "латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)",
  second_name:
    "латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)",
  display_name:
    "латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)",
  login:
    "Логин от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание).",
  email:
    "латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы",
  password:
    "от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра",
  phone: " от 10 до 15 символов, состоит из цифр, может начинается с плюса",
  NoEmpty: "не должно быть пустым",
};
