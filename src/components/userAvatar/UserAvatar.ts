import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import userAvatar from "./userAvatar.hbs?raw";
import "./userAvatar.css";
import connect from "../../utils/HOC/connect";
import { getAvatarUrl } from "../../utils/utils";

class UserAvatar extends Block<IBlockProps> {
  constructor(props: IBlockProps) {
    super(props);
  }

  render(): DocumentFragment {
    let userAvatarUrl = null;
    if (this.props.avatar) {
      userAvatarUrl = getAvatarUrl(this.props.avatar as string);
    }
    return this.compile(userAvatar, {
      ...this.props,
      userAvatar: userAvatarUrl,
    });
  }
}

const withUserAvatar = connect((state) => ({ avatar: state.user?.avatar }));

export default withUserAvatar(UserAvatar as typeof Block);
