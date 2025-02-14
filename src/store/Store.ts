import { IUserData } from "./../api/AuthAPI/IAuthAPI";
import { StoreEvents } from "../enums/StoreEvents";
import EventBus from "../utils/EventBus/EventBus";
import { set } from "../utils/utils";
import { IChatData } from "../api/ChatsAPI/IChatsAPI";

interface IStoreState {
  user?: IUserData;
  chats?: IChatData[];
}

class Store extends EventBus {
  private _state: IStoreState = {};

  constructor() {
    super();
    this.on(StoreEvents.Update, () => {});
  }

  public getState() {
    return this._state;
  }

  public set(path: string, value: unknown) {
    set(this._state, path, value);
    this.emit(StoreEvents.Update);
  }
}

const store = new Store();

export default store;
