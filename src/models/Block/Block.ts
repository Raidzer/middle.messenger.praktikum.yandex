import Handlebars from "handlebars";
import EventBus from "../../utils/EventBus";
import { IBlockProps } from "./IBlock";
import { v4 as uuid } from "uuid";

export default class Block<T extends IBlockProps> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_UPDATE: "flow:component-did-update",
  };

  private _element: HTMLElement | null = null;
  private _id: string | null = null;
  private _eventBus: () => EventBus;

  props: IBlockProps;
  children: Record<string, Block<IBlockProps>>;

  constructor(propsAndChildren: IBlockProps = {}) {
    const eventBus = new EventBus();
    const { children, props } = this._getChildren(propsAndChildren);

    this.children = children;

    this._id = uuid();

    this.props = this._makePropsProxy({ ...props, __id: this._id });

    this._eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
    eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  private _getChildren(propsAndChildren: IBlockProps) {
    const children: Record<string, Block<IBlockProps>> = {};
    const props: Record<string, unknown> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_UPDATE, this._componentDidUpdate.bind(this));
  }

  private _createResources(): void {
    this._element = this._createDocumentElement("div");
  }

  init(): void {
    this._createResources();
  }

  private _componentDidMount(): void {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount(oldProps?: IBlockProps): void {
    console.log("🚀 ~ Block<T ~ componentDidMount ~ oldProps:", oldProps);
  }

  dispatchComponentDidMount(): void {
    this._eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(
    oldProps: IBlockProps,
    newProps: IBlockProps
  ): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidUpdate(oldProps: IBlockProps, newProps: IBlockProps): boolean {
    return true;
  }

  setProps = (nextProps: T): void | null => {
    if (!nextProps) {
      return null;
    }

    const { children } = this._getChildren(nextProps);

    this.children = { ...this.children, ...children };
    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render(): void | null {
    if (!this.element) {
      return null;
    }
    const block = this.render();

    if (!(block instanceof DocumentFragment)) {
      return;
    }

    this._deleteEvents();
    this.element.innerHTML = "";
    this.element.appendChild(block);
    this._addEvents();
  }

  compile(template: string, props: IBlockProps) {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      if (child._id) {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
      }
    });

    const compiledTemplate = Handlebars.compile(template);
    const fragment = document.createElement("template") as HTMLTemplateElement;
    fragment.innerHTML = compiledTemplate(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

      if (stub && child) {
        const children = child.getContent();
        if (children) {
          stub.replaceWith(children);
        }
      }
    });
    return fragment.content;
  }

  render(): DocumentFragment | string {
    return "";
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: IBlockProps) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    const proxyProps = new Proxy(props, {
      set: (target, prop, value) => {
        if (typeof prop === "symbol") {
          return false;
        }

        if (prop === "events") {
          self._deleteEvents();
        }

        target[prop] = value;
        self._eventBus().emit(Block.EVENTS.FLOW_UPDATE, { ...target }, target);
        return true;
      },

      deleteProperty: () => {
        throw new Error("Нет доступа");
      },
    });

    return proxyProps;
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    const element = document.createElement(tagName);

    if (this._id) {
      element.setAttribute("data-id", this._id);
    }

    return element;
  }

  private _addEvents(): void {
    const { events = {} } = this.props;

    for (const eventName in events) {
      this.element?.addEventListener(eventName, events[eventName]);
    }
  }

  private _deleteEvents(): void {
    const { events = {} } = this.props;
    for (const eventName in events) {
      this.element?.removeEventListener(eventName, events[eventName]);
    }
  }

  show() {
    if (!this.element) {
      return;
    }
    this.element.style.display = "block";
  }

  hide() {
    if (!this.element) {
      return;
    }
    this.element.style.display = "none";
  }
}
