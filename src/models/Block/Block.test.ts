import { expect } from "chai";
import Block from "./Block.ts";
import { IBlockProps } from "./IBlock.ts";
import Sinon from "sinon";

class MockBlock extends Block<IBlockProps> {
  constructor(props: IBlockProps) {
    super(props);
  }
  render() {
    const fragment = document.createDocumentFragment();
    const div = document.createElement("div");
    div.innerHTML = "Test";
    fragment.appendChild(div);
    return fragment;
  }
}

describe("Тестирование класса Block", () => {
  it("Проверка корректного создания элемента", () => {
    const block = new MockBlock({});
    const element = block.getContent();

    expect(element).to.not.equal(null);
    expect(element).to.be.an.instanceof(HTMLDivElement);
  });

  it("Проверка корректного добавления props", () => {
    const block = new MockBlock({ title: "Test" });
    expect(block.props.title).to.equal("Test");
  });

  it("Обновление пропсов", () => {
    const block = new MockBlock({ title: "Initial" });
    block.setProps({ title: "Updated" });
    expect(block.props.title).to.equal("Updated");
  });

  it("Отработка триггера при монтировании компонента", () => {
    const block = new MockBlock({});
    const spy = Sinon.spy(block, "componentDidMount");

    block.dispatchComponentDidMount();

    expect(spy.calledOnce).to.equal(true);
  });

  it("Отработка триггера при обновлении компонента", () => {
    const block = new MockBlock({});
    const spy = Sinon.spy(block, "componentDidUpdate");

    block.setProps({ title: "test" });

    expect(spy.calledOnce).to.equal(true);
  });

  describe("Проверка отображения и скрытия блока", () => {
    it("Проверка отображения компонента", () => {
      const block = new MockBlock({});

      block.show();
      const className = block.getContent()?.style.display;

      expect(className).to.equal("flex");
    });

    it("Проверка скрытия компонента", () => {
      const block = new MockBlock({});

      block.hide();
      const className = block.getContent()?.style.display;

      expect(className).to.equal("none");
    });
  });

  it("Проверка назначения и отработки эвента", () => {
    const clickSpy = Sinon.spy();

    const block = new MockBlock({
      title: "Event Test",
      events: {
        click: {
          cb: clickSpy,
        },
      },
    });

    const element = block.getContent();

    element?.dispatchEvent(new MouseEvent("click"));

    expect(clickSpy.calledOnce).to.equal(true);
  });
});
