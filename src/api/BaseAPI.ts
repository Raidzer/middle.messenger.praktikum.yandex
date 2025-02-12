import { Routes } from "../enums/Routes";
import Router from "../router/Router";
import HTTPService from "../service/HttpService/HttpService";

export abstract class BaseAPI {
  protected _fetch: HTTPService;

  constructor(endpoint: string) {
    this._fetch = new HTTPService(endpoint);
  }

  protected responseOk(status: number) {
    if (status >= 500) {
      Router.go(Routes.ERROR500);
    } else {
      return true;
    }
  }

  create() {
    throw new Error("Not implemented");
  }

  request() {
    throw new Error("Not implemented");
  }

  update() {
    throw new Error("Not implemented");
  }

  delete() {
    throw new Error("Not implemented");
  }
}
