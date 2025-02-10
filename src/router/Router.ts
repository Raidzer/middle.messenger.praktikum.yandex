import Page from "../models/Page/Page";
import Route from "./route";

class Router {
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

  use(pathname: string, block: typeof Page) {
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
    const route = this.getRoute(pathname);
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

export default Router;
