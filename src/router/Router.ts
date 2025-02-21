import { Routes } from "../enums/Routes.ts";
import Block from "../models/Block/Block.ts";
import Route from "./route.ts";

export class Router {
  private static instance: Router;

  private _currentRoute: Route | null = null;
  private _rootQuery: string = "";

  routes: Route[] = [];
  history: History = window.history;

  constructor(rootQuery: string) {
    if (Router.instance) {
      return Router.instance;
    }

    this._rootQuery = rootQuery;

    Router.instance = this;
  }

  use(pathname: string, block: new ({...args}) => Block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = ((event: PopStateEvent) => {
      const target = event.currentTarget as Window;
      this._onRoute(target.location.pathname);
    }).bind(this);

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    let route = this.getRoute(pathname);
    if (!route) {
      route = this.getRoute(Routes.ERROR404);
    }

    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default new Router(".root");
