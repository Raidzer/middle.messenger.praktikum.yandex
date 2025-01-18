import EventBus from "../../utils/EventBus";
import { IBlockMeta, IBlockProps } from "./IBlock";

export default class Block<T extends IBlockProps> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_UPDATE: "flow:component-did-update",
  };

  private _element: HTMLElement | null = null;
  private _meta: IBlockMeta;
  private eventBus: () => EventBus;
  props: IBlockProps;

  constructor(tagName = "div", props: IBlockProps = {}) {
    const eventBus = new EventBus();

    this._meta = {
      tagName,
      props,
    };

    if (props.children) {
      for (const childName in props.children) {
        const child = props.children[childName];
        if (child instanceof Block) {
          props[childName] = child.render();
        }
      }
    }

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
    eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_UPDATE, this._componentDidUpdate.bind(this));
  }

  private _createResources(): void {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init(): void {
    this._createResources();
  }

  private _componentDidMount(): void {
    this.componentDidMount();
  }

  componentDidMount(oldProps?: IBlockProps): void {
    console.log("🚀 ~ Block<T ~ componentDidMount ~ oldProps:", oldProps);
  }

  dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(
    oldProps: IBlockProps,
    newProps: IBlockProps
  ): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: IBlockProps, newProps: IBlockProps): boolean {
    console.log("🚀 ~ Block<T ~ componentDidUpdate ~ newProps:", newProps);
    console.log("🚀 ~ Block<T ~ componentDidUpdate ~ oldProps:", oldProps);
    return true;
  }

  setProps = (nextProps: T): void | null => {
    if (!nextProps) {
      return null;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render(): void | null {
    if (!this._element) {
      return null;
    }
    const block = this.render();

    this._element.innerHTML = block;
    this._addEvents();
  }

  render(): string {
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
        self.eventBus().emit(Block.EVENTS.FLOW_UPDATE, { ...target }, target);
        return true;
      },

      deleteProperty: () => {
        throw new Error("Нет доступа");
      },
    });

    return proxyProps;
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  private _addEvents(): void {
    const { events = {} } = this.props;

    for (const eventName in events) {
      this._element?.addEventListener(eventName, events[eventName]);
    }
  }

  private _deleteEvents(): void {
    const { events = {} } = this.props;
    for (const eventName in events) {
      this._element?.removeEventListener(eventName, events[eventName]);
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
