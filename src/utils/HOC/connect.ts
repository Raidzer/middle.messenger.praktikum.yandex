import { StoreEvents } from "../../enums/StoreEvents";
import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import store from "../../store/Store";

export default function connect(Component: typeof Block) {
  return class extends Component {
    constructor(props: IBlockProps) {
      super({ ...props });
      store.on(StoreEvents.Update, () => {
        this.setProps({ ...store.getState() });
      });
    }
  };
}
