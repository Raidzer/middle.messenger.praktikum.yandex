import Block from "../models/Block/Block.ts";
import { render } from "../utils/utils.ts";

interface IRouteProps {
  rootQuery: string;
  [key: string]: unknown;
}

function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
}

class Route {
  private _pathname: string;
  private _blockClass: new ({ ...args }) => Block;
  private _block: Block | null;
  private _props: IRouteProps;

  constructor(
    pathname: string,
    view: new ({ ...args }) => Block,
    props: IRouteProps
  ) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    this._block = new this._blockClass({});
    render(this._props.rootQuery, [this._block]);
  }
}

export default Route;
