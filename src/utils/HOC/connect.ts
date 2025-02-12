import { StoreEvents } from "../../enums/StoreEvents";
import Block from "../../models/Block/Block";
import Store from "../../store/Store";

type BlockConstructor<T = unknown> = new (props: T) => Block;

export default function connect<T>(Component: BlockConstructor<T>) {
  return class extends Component {
    constructor(props: T) {
      super(props);
      Store.on(StoreEvents.Update, () => {
        this.setProps(Store.getState() as Partial<T>);
      });
    }
  };
}
