import { IUserData } from "./../api/AuthAPI/IAuthAPI";
import { StoreEvents } from "../enums/StoreEvents";
import EventBus from "../utils/EventBus/EventBus";
import { set } from "../utils/utils";
import { IChatData } from "../api/ChatsAPI/IChatsAPI";
import { IMessagesData } from "../controller/MessagesController/IMessagesController";

interface IStoreState {
  user?: IUserData;
  chats?: IChatData[];
  selectedChat: IChatData | null;
  messages?: IMessagesData[];
  userSearchList: IUserData[];
}

class Store extends EventBus {
  private _state: IStoreState;

  constructor() {
    super();
    this._state = {
      selectedChat: null,
      userSearchList: [],
    };
    this.on(StoreEvents.Update, () => {});
  }

  public getState() {
    return this._state;
  }

  public set<K extends keyof IStoreState>(path: K, value: unknown) {
    set(this._state, path, value);
    this.emit(StoreEvents.Update);
  }
}

const store = new Store();

export default store;
