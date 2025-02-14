import ChatsAPI from "../api/ChatsAPI/ChatsAPI";
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
}

export default new ChatsController();
