import { expect } from "chai";
import Block from "../models/Block/Block.ts";
import { Router } from "./Router.ts";
import Route from "./route.ts";

class MockBlock extends Block {
  render(): DocumentFragment {
    return this.compile(`<div>Test<div>`, this.props);
  }
}

function waitForPopState(): Promise<void> {
  return new Promise((resolve) => {
    window.addEventListener("popstate", () => resolve(), { once: true });
  });
}

describe("Router", () => {
  let router: Router;

  beforeEach(() => {
    router = new Router(".root");
  });

  it("Проверка что Router создается в единственном экземпляре", () => {
    const anotherRouter = new Router(".root");
    expect(router).to.equal(anotherRouter);
  });

  it("Проверка добавления маршрутов в Router", () => {
    router.use("/home", MockBlock);
    expect(router.routes).to.have.lengthOf(1);
    expect(router.getRoute("/home")).to.be.instanceOf(Route);
  });

  it("Проверка перехода по заданному маршруту", () => {
    router.use("/test", MockBlock);
    router.start();
    router.go("/test");
    expect(router.getRoute("/test")).not.equal(undefined);
  });

  it("Проверка перехода назад", async () => {
    router.use("/page1", MockBlock).use("/page2", MockBlock);
    router.start();
    router.go("/page1");
    router.go("/page2");

    router.back();
    await waitForPopState();

    expect(window.location.pathname).to.equal("/page1");
  });

  it("Проверка перехода вперед", async () => {
    router.use("/page1", MockBlock).use("/page2", MockBlock);
    router.start();
    router.go("/page1");
    router.go("/page2");

    router.back();
    await waitForPopState();

    router.forward();
    await waitForPopState();
    expect(window.location.pathname).to.equal("/page2");
  });
});
