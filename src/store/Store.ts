import { IUserData } from "./../api/AuthAPI/IAuthAPI";
import { StoreEvents } from "../enums/StoreEvents";
import EventBus from "../utils/EventBus/EventBus";
import { set } from "../utils/utils";
import { IChatData } from "../api/ChatsAPI/IChatsAPI";
import { IMessagesData } from "../controller/MessagesController/IMessagesController";

interface IStoreState {
  user: IUserData | null;
  chats?: IChatData[];
  selectedChat: IChatData | null;
  messages: IMessagesData[];
  userSearchList: IUserData[];
  selectedUser: IUserData | null;
}

class Store extends EventBus {
  private _state: IStoreState;

  constructor() {
    super();
    this._state = {
      selectedChat: null,
      userSearchList: [],
      selectedUser: null,
      user: null,
      messages: [],
    };
  }

  public getState() {
    return { ...this._state };
  }

  public set<K extends keyof IStoreState>(path: K, value: unknown) {
    set(this._state, path, value);
    this.emit(StoreEvents.Update);
  }

  public clearTemporaryData() {
    this._state = {
      selectedChat: null,
      userSearchList: [],
      selectedUser: null,
      user: null,
      messages: [],
    };
  }
}

const store = new Store();

export default store;
