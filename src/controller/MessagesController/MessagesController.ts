import ChatsAPI from "../../api/ChatsAPI/ChatsAPI";
import { WSTransportEvents } from "../../enums/WSTransportEvents";
import { WSTransport } from "../../service/WSTransport/WSTransport";
import store from "../../store/Store";
import { IMessagesData, ISendMessageData } from "./IMessagesController";

class MessagesController {
  private _openSocket: WSTransport | null;

  constructor() {
    this._openSocket = null;
  }

  public async getChatMessageToken(id: number): Promise<string | null> {
    try {
      const response = await ChatsAPI.getChatToken(id);
      const data = response.data as { token?: string };

      if (response.status === 200 && data.token) {
        return data.token;
      }
      return null;
    } catch (error) {
      console.warn(error);
      return null;
    }
  }

  public async connectChat(userId: number, chatId: number, token: string) {
    if (!this._openSocket) {
      const urlWs = `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`;
      const wsTransport = new WSTransport(urlWs);

      await wsTransport.connect();
      wsTransport.on(WSTransportEvents.Message, (data) =>
        this._gotMessage(data)
      );

      this._openSocket = wsTransport;
    } else {
      this._openSocket.close();
      this._openSocket = null;
      store.set("messages", []);

      const urlWs = `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`;

      const wsTransport = new WSTransport(urlWs);

      await wsTransport.connect();
      wsTransport.on(WSTransportEvents.Message, (data) =>
        this._gotMessage(data)
      );

      this._openSocket = wsTransport;
    }
    this._getOldMessage();
  }

  public sendMessage(data: ISendMessageData) {
    this._openSocket?.send(data);
  }

  private _getOldMessage() {
    if (this._openSocket) {
      this._openSocket.send({ type: "get old", content: "0" });
    }
  }

  private _gotMessage(data: IMessagesData[] | IMessagesData) {
    let messages: IMessagesData[] = [];
    if (Array.isArray(data)) {
      messages = data.reverse();
    } else {
      messages.push(data);
    }

    store.set("messages", messages);
  }
}

export default new MessagesController();
