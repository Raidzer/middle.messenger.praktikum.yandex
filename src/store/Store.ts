import { StoreEvents } from "../enums/StoreEvents";
import EventBus from "../utils/EventBus/EventBus";
import { set } from "../utils/utils";

interface IStoreState {
  [key: string]: unknown;
}

class Store extends EventBus {
  private _state: IStoreState = {};

  public getState() {
    return this._state;
  }

  public set(path: string, value: unknown) {
    set(this._state, path, value);

    this.emit(StoreEvents.Update);
  }
}

export default new Store();
