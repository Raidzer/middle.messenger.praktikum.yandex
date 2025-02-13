export interface IUserChangeData {
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
}

export interface IPasswordChangeData {
  oldPassword: string;
  newPassword: string;
}
