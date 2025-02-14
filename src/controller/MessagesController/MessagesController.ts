import ChatsAPI from "../../api/ChatsAPI/ChatsAPI";
import { WSTransportEvents } from "../../enums/WSTransportEvents";
import { WSTransport } from "../../service/WSTransport/WSTransport";
import store from "../../store/Store";
import { IMessagesData } from "./IMessagesController";

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

  private _getOldMessage() {
    if (this._openSocket) {
      this._openSocket.send({ type: "get old", content: "0" });
    }
  }

  private _gotMessage(data: IMessagesData[]) {
    store.set("messages", data);
    console.log(store.getState());
  }
}

export default new MessagesController();
