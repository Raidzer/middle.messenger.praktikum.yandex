import { BaseAPI } from "../BaseAPI";
import { IChatAddUsers, IChatCreateData, IChatDeleteData } from "./IChatsAPI";

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

  async getChatToken(id: number) {
    try {
      const response = await this._fetch.post(`/token/${id}`);
      return response;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async addUserToChat(data: IChatAddUsers) {
    try {
      const response = await this._fetch.put("/users", { data });

      return response;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async deleteUsersFromChat(data: IChatDeleteData) {
    try {
      const response = await this._fetch.delete("/users", { data });

      return response;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async getChatUsers(idChat: number) {
    try {
      const response = await this._fetch.get(`/${idChat}/users`);

      return response;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default new ChatsAPI();
