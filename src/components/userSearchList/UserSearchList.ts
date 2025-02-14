import { IChatData } from "./../../api/ChatsAPI/IChatsAPI";
import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import userSearchList from "./userSearchList.hbs?raw";
import "./userSearchList.css";
import connect from "../../utils/HOC/connect";
import Button from "../button/Button";
import { ButtonType } from "../../enums/Button";
import Router from "../../router/Router";
import { Routes } from "../../enums/Routes";
import MessageCard from "../messageCard/messageCard";

interface IUserSearchList extends IBlockProps {
  children: {
    messagesCard: MessageCard[];
  };
}

const profile = new Button({
  type: ButtonType.BUTTON,
  label: "Профиль",
  events: {
    click: {
      cb: () => Router.go(Routes.PROFILE),
    },
  },
});

class UserSearchList extends Block<IUserSearchList> {
  constructor(props?: IUserSearchList) {
    props = {
      profile,
      children: {
        messagesCard: [],
      },
    };
    super(props);
    this.children.messagesCard = [];
  }

  componentDidUpdate(oldProps: IBlockProps, newProps: IBlockProps): boolean {
    
    const chats = newProps.chats as IChatData[];
    if (chats.length > 0) {
      chats.forEach((chat) => {
        const messageCard = new MessageCard({
          title: chat.title,
          last_message: chat.last_message?.content,
          id: chat.id,
          unread_count: chat.unread_count,
        }) as Block<IBlockProps>;
        this.children.messagesCard.push(messageCard);
      });
    }

    return true;
  }

  render(): DocumentFragment {
    return this.compile(userSearchList, this.props);
  }
}

const withChat = connect((state) => ({ chats: state.chats }));

export default withChat(UserSearchList as typeof Block);
