import { BaseAPI } from "../BaseAPI";
import { IChatCreateData, IChatDeleteData } from "./IChatsAPI";

class ChatsAPI extends BaseAPI {
  constructor() {
    super("/chats");
  }

  async getChatsList() {
    try {
      const response = await this._fetch.get("");
      return response;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async createChat(data: IChatCreateData) {
    try {
      const response = await this._fetch.post("", { data });
      return response;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async deleteChat(data: IChatDeleteData) {
    try {
      const response = await this._fetch.delete("", { data });
      return response;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default new ChatsAPI();
