import { StoreEvents } from "../../enums/StoreEvents";
import Block from "../../models/Block/Block";
import { IBlockProps } from "../../models/Block/IBlock";
import store from "../../store/Store";
import { Indexed, isEqual } from "../utils";

export default function connect(mapStateToProps: (state: Indexed) => Indexed) {
  return function (Component: typeof Block) {
    return class extends Component {
      constructor(props: IBlockProps) {
        let state = mapStateToProps(store.getState());
        super({ ...props, ...state });
        store.on(StoreEvents.Update, () => {
          const newState = mapStateToProps(store.getState());
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
            state = newState;
          }
        });
      }
    };
  };
}
