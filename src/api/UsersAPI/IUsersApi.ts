export interface IUserChangeData {
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
}

export interface IUserPasswordChangeData {
  oldPassword: string;
  newPassword: string;
}

export interface ISearchUserByLogin {
  login: string;
}
