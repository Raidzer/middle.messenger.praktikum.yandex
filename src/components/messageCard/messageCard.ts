import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import messageCard from "./messageCard.hbs?raw";
import "./messageCard.css";
import store from "../../store/Store";
import MessagesController from "../../controller/MessagesController/MessagesController";

interface IMessageCardProps extends IBlockProps {
  id?: number;
  title: string;
  last_message: string;
  unread_count: number;
}

export default class MessageCard extends Block<IMessageCardProps> {
  constructor(props: IMessageCardProps) {
    props = {
      events: {
        click: {
          cb: async () => {
            const chatId = props.id;
            const { user } = store.getState();
            const userId = user?.id;

            if (chatId && userId) {
              store.set("idSelectedChat", props.id);
              const token = await MessagesController.getChatMessageToken(
                chatId
              );
              if (token) {
                MessagesController.connectChat(userId, chatId, token);
              }
            }
          },
        },
      },
      ...props,
    };
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(messageCard, this.props);
  }
}
