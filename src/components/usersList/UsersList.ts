import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import connect from "../../utils/HOC/connect";
import usersList from "./usersList.hbs?raw";
import "./usersList.css";
import { IUserData } from "../../api/AuthAPI/IAuthAPI";
import UserRow from "../userRow/UserRow";
import { isEqual } from "../../utils/utils";

class UsersList extends Block<IBlockProps> {
  constructor(props: IBlockProps) {
    super(props);
  }

  componentDidUpdate(oldProps: IBlockProps, newProps: IBlockProps): boolean {
    if (isEqual(oldProps, newProps)) {
      return false;
    }
    const usersList = newProps.userSearchList as IUserData[];

    if (usersList) {
      this.children.usersList = [];
      this.children.usersList = usersList.map((user) => {
        const userIsSelected = user.id === this.props?.selectedUserId;
        return new UserRow({ user, isSelected: userIsSelected });
      });
    }
    return true;
  }

  render(): DocumentFragment {
    return this.compile(usersList, this.props);
  }
}

const withUsersList = connect((state) => ({
  userSearchList: state.userSearchList,
  selectedUserId: state.selectedUser?.id,
}));

export default withUsersList(UsersList as typeof Block);
