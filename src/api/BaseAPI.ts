import HTTPService from "../service/HttpService/HttpService";

export abstract class BaseAPI {
  protected _fetch: HTTPService;

  constructor(endpoint: string) {
    this._fetch = new HTTPService(endpoint);
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
