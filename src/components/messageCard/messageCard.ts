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
            const selectedChatId = props.id;
            const { user, chats, selectedChat } = store.getState();
            const userId = user?.id;

            if (selectedChatId === selectedChat?.id) {
              return;
            }

            if (selectedChatId && userId && chats) {
              store.set("messages", []);
              const selectedChat = structuredClone(
                chats.find((chat) => chat.id === selectedChatId)
              );

              store.set("selectedChat", selectedChat);
              const token = await MessagesController.getChatMessageToken(
                selectedChatId
              );
              if (token) {
                await MessagesController.connectChat(
                  userId,
                  selectedChatId,
                  token
                );
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
