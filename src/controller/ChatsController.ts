import ChatsAPI from "../api/ChatsAPI/ChatsAPI";
import {
  IChatAddUsers,
  IChatCreateData,
  IChatDeleteData,
} from "../api/ChatsAPI/IChatsAPI";
import store from "../store/Store";

class ChatsController {
  public async getChats() {
    try {
      const response = await ChatsAPI.getChatsList();

      if (!response) {
        return;
      }

      if (response.status === 200) {
        store.set("chats", response.data);
      }
    } catch (error) {
      console.warn(error);
    }
  }

  public async createChat(data: IChatCreateData) {
    try {
      const response = await ChatsAPI.createChat(data);

      if (response.status === 200) {
        await this.getChats();
      }

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  public async deleteChat(data: IChatDeleteData) {
    try {
      const response = await ChatsAPI.deleteChat(data);

      if (response.status === 200) {
        await this.getChats();
        store.set("selectedChat", null);
      }

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  public async addUsersToChat(data: IChatAddUsers) {
    try {
      const response = await ChatsAPI.addUserToChat(data);

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  public async getChatUsers(idChat: number): Promise<boolean> {
    try {
      const response = await ChatsAPI.getChatUsers(idChat);

      if (response.status === 200) {
        store.set("userSearchList", response.data);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public clearSearchUser() {
    store.set("userSearchList", []);
  }

  public async deleteChatUsers(data: IChatAddUsers) {
    try {
      const response = await ChatsAPI.deleteUsersFromChat(data);
      await this.getChatUsers(data.chatId);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new ChatsController();
