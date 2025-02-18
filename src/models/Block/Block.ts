import Handlebars from "handlebars";
import EventBus from "../../utils/EventBus/EventBus";
import { IBlockProps } from "./IBlock";
import { v4 as uuid } from "uuid";
import { isEqual } from "../../utils/utils";

export default abstract class Block<T extends IBlockProps = IBlockProps> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_UPDATE: "flow:component-did-update",
  };

  private _element: HTMLElement | null = null;
  private _id: string | null = null;
  private _eventBus: () => EventBus;

  props: Partial<T>;
  children: Record<string, Block<IBlockProps>[]>;

  constructor(propsAndChildren: T) {
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
    const children: Record<string, Block<IBlockProps>[]> = {};
    const props: Partial<T> = {};
    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        children[key] = [...value];
      }
      if (value instanceof Block) {
        if (children.key) {
          children.key.push(value);
        } else {
          children[key] = [value];
        }
      } else {
        props[key as keyof T] = value as T[keyof T];
      }
    });
    return { children, props };
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_UPDATE, this._componentDidUpdate.bind(this));
  }

  init(): void {
    this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _init(): void {
    this.init();
  }

  private _componentDidMount(): void {
    this.componentDidMount();

    Object.values(this.children).forEach((children) => {
      children.forEach((child) => child.dispatchComponentDidMount);
    });
  }

  componentDidMount(): void {}

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

  componentDidUpdate(oldProps: IBlockProps, newProps: IBlockProps): boolean {
    if (isEqual(oldProps, newProps)) {
      return false;
    }

    return true;
  }

  setProps = (nextProps: T): void | null => {
    if (!nextProps) {
      return null;
    }

    const { children } = this._getChildren(nextProps);

    Object.entries(children).forEach(([key, child]) => {
      if (this.children[key]) {
        this.children[key] = [...this.children[key], ...child];
      } else {
        this.children[key] = child;
      }
    });

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render(): void | null {
    const block = this.render();
    if (!(block instanceof DocumentFragment)) {
      return;
    }

    const newElement = block.firstChild as HTMLElement;

    if (this.element) {
      this.element.replaceWith(newElement);
    }

    this._element = newElement;
    this._deleteEvents();
    this._addEvents();
    this._eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  compile(template: string, props: IBlockProps) {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = [];
      child.forEach((el) => {
        if (el._id) {
          if (Array.isArray(propsAndStubs[key])) {
            propsAndStubs[key].push(`<div data-id="${el._id}"></div>`);
          }
        } else {
          propsAndStubs[key] = child;
          return;
        }
      });
    });

    const compiledTemplate = Handlebars.compile(template);
    const fragment = document.createElement("template") as HTMLTemplateElement;
    fragment.innerHTML = compiledTemplate(propsAndStubs);

    Object.values(this.children).forEach((children) => {
      children.forEach((child) => {
        const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
        if (stub && child) {
          const children = child.getContent();
          if (children) {
            stub.replaceWith(children);
          }
        }
      });
    });

    return fragment.content;
  }

  render(): DocumentFragment | string {
    return "";
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: Partial<T>) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    const proxyProps = new Proxy(props, {
      set: (target, prop, value) => {
        if (typeof prop === "symbol") {
          return false;
        }
        const oldTarget = { ...target };
        if (prop === "events") {
          const existingEvents = (target[prop] as Partial<T>["events"]) || {};
          const newEvents = value as Partial<T>["events"];

          const mergedEvents = { ...existingEvents, ...newEvents };
          target[prop as keyof T] = mergedEvents as T[keyof T];
        } else {
          (target as T)[prop as keyof T] = value;
        }

        self._eventBus().emit(Block.EVENTS.FLOW_UPDATE, oldTarget, target);
        return true;
      },

      deleteProperty: () => {
        throw new Error("Нет доступа");
      },
    });

    return proxyProps;
  }

  private _addEvents(): void {
    const { events } = this.props;

    for (const eventName in events) {
      const cb = events[eventName as keyof HTMLElementEventMap]?.cb;
      const option =
        events[eventName as keyof HTMLElementEventMap]?.option ?? false;
      if (cb) {
        this.element?.addEventListener(
          eventName as keyof HTMLElementEventMap,
          cb as EventListener,
          option
        );
      }
    }
  }

  private _deleteEvents(): void {
    const { events } = this.props;
    for (const eventName in events) {
      const cb = events[eventName as keyof HTMLElementEventMap]?.cb;
      if (cb) {
        this.element?.removeEventListener(
          eventName as keyof HTMLElementEventMap,
          cb as EventListener
        );
      }
    }
  }

  show() {
    if (!this.element) {
      return;
    }
    this.element.style.display = "flex";
  }

  hide() {
    if (!this.element) {
      return;
    }
    this.element.style.display = "none";
  }
}
