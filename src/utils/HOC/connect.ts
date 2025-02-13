import { StoreEvents } from "../../enums/StoreEvents";
import Block from "../../models/Block/Block";
import store from "../../store/Store";

type BlockConstructor<T = unknown> = new (props: T) => Block;

export default function connect<T>(Component: BlockConstructor<T>) {
  return class extends Component {
    constructor(props: T) {
      super(props);
      store.on(StoreEvents.Update, () => {
        this.setProps(store.getState() as Partial<T>);
      });
    }
  };
}
