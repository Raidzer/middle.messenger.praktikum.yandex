import Button from "../../components/button/Button";
import { ChangePasswordForm } from "../../components/userInfoForm/userInfoForm";
import { InfoRow } from "../../components/infoRow/InfoRow";
import { UserProfile } from "../../components/userProfile/UserProfile";
import { ButtonClass, ButtonType } from "../../enums/Button";
import { InputType } from "../../enums/Input";
import render from "../../utils/utils";

const buttonSave = new Button({
  type: ButtonType.SUBMIT,
  label: "Изменить пароль",
  class: ButtonClass.PRIMARY,
});

const infoRowOldPassword = new InfoRow({
  infoName: "Пароль",
  type: InputType.PASSWORD,
  isEditable: true,
  infoData: "",
  name: "oldPassword",
  placeholder: "Пароль",
});

const infoRowNewPassword = new InfoRow({
  infoName: "Новый пароль",
  type: InputType.PASSWORD,
  isEditable: true,
  infoData: "",
  name: "newPassword",
  placeholder: "Новый пароль",
});

const infoRowNewPasswordRepeat = new InfoRow({
  infoName: "Новый пароль (еще раз)",
  type: InputType.PASSWORD,
  isEditable: true,
  infoData: "",
  name: "newPasswordRepeat",
  placeholder: "Новый пароль (еще раз)",
});

const changePasswordForm = new ChangePasswordForm({
  children: {
    buttonSave,
    infoRowOldPassword,
    infoRowNewPassword,
    infoRowNewPasswordRepeat,
  },
});

const page = new UserProfile({
  children: {
    children: changePasswordForm,
  },
});

render(".root", [page]);
