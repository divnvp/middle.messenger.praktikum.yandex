import { BlockOrBlockArray } from '../models/types';
import EventBus from '../utils/event-bus';
import Handlebars from 'handlebars';
import isEquals from '../utils/custom-utils/is-equals';
import { v4 as makeUUID } from 'uuid';
import { TProp } from '../models/prop.type';

class Block<P extends TProp = NonNullable<unknown>> {
  private readonly EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  };

  private readonly eventBus: () => EventBus;
  private readonly id = makeUUID();
  private htmlElement?: HTMLElement;

  protected props: P;
  child: Record<string, BlockOrBlockArray>;

  get element() {
    return this.htmlElement;
  }

  constructor(localProps: P) {
    const { props, child } = this.getChildrenAndProps(localProps);

    const eventBus = new EventBus();

    this.child = child;
    this.props = this.makePropsProxy(props) as P;

    this.eventBus = () => eventBus;
    this.registerEvents(eventBus);

    eventBus.emit(this.EVENTS.INIT);
  }

  protected init() {}

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(this.EVENTS.FLOW_CDM);
    this.dispatchForEachChild();
  }

  protected componentDidUpdate(oldProps: P, newProps: P) {
    return !isEquals(oldProps, newProps);
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  protected compile(template: (context: unknown) => string, context?: Record<string, unknown>) {
    const propsAndStubs = { ...context };

    this.initializeUniqueElements(propsAndStubs);

    const html = Handlebars.compile(template)(propsAndStubs);
    const fragment = document.createElement('template');
    fragment.innerHTML = html;

    this.replaceStubs(fragment);

    return fragment.content;
  }

  setProps = (nextProps: Partial<P>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  getContent() {
    return this.element;
  }

  private dispatchForEachChild() {
    Object.values(this.child).forEach(child => {
      if (Array.isArray(child)) {
        child.forEach(localChild => localChild.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  private initializeUniqueElements(propsAndStubs: Record<string, unknown>) {
    Object.entries(this.child).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.map(child => `<div data-id="${child.id}"></div>`);
      } else {
        propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
      }
    });
  }

  private replaceStubs(fragment: HTMLTemplateElement) {
    Object.entries(this.child).forEach(([, child]) => {
      if (Array.isArray(child)) {
        child.forEach((block: Block) => this.replaceStubWithContent(block, fragment));
      } else {
        this.replaceStubWithContent(child, fragment);
      }
    });
  }

  private replaceStubWithContent(block: Block, fragment: HTMLTemplateElement) {
    const stub = fragment.content.querySelector(`[data-id="${block.id}"]`);

    if (!stub) {
      return;
    }

    block.getContent()?.append(...Array.from(stub.childNodes));
    stub.replaceWith(block.getContent()!);
  }

  private getChildrenAndProps(childrenAndProps: P): {
    props: P;
    child: Record<string, BlockOrBlockArray>;
  } {
    const props: Record<string, unknown> = {};
    const child: Record<string, BlockOrBlockArray> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length && value.every(v => v instanceof Block)) {
        child[key as string] = value;
      } else if (value instanceof Block) {
        child[key as string] = value;
      } else {
        props[key] = value;
      }
    });

    return { props: props as P, child };
  }

  private addEvents() {
    const { events = {} } = this.props;

    Object.keys(
      events as {
        events: Record<string, () => void>;
      }
    ).forEach(eventName => {
      this.htmlElement?.addEventListener(
        eventName,
        (events as Record<string, () => void>)[eventName],
        true
      );
    });
  }

  private registerEvents(eventBus: EventBus) {
    eventBus.on(this.EVENTS.INIT, this.localInit.bind(this));
    eventBus.on(this.EVENTS.FLOW_CDM, this.localComponentDidMount.bind(this));
    eventBus.on(
      this.EVENTS.FLOW_CDU,
      this.localComponentDidUpdate.bind(this) as (...args: unknown[]) => void
    );
    eventBus.on(this.EVENTS.FLOW_RENDER, this.localRender.bind(this));
  }

  private localInit() {
    this.init();

    this.eventBus().emit(this.EVENTS.FLOW_RENDER);
  }

  private localComponentDidMount() {
    this.componentDidMount();
  }

  private localComponentDidUpdate(oldProps: P, newProps: P) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(this.EVENTS.FLOW_RENDER);
    }
  }

  private localRender() {
    const documentFragment = this.render();
    const child = documentFragment.firstElementChild;

    if (this.htmlElement && child) {
      this.htmlElement.replaceWith(child);
    }

    this.htmlElement = child as HTMLElement;

    this.addEvents();
  }

  private makePropsProxy(props: TProp) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    const event = this.EVENTS;

    return new Proxy(props, {
      get(target, p) {
        const value = target[p as string];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, p, newValue) {
        const savedTarget = { ...target };
        target[p as string] = newValue;
        self.eventBus().emit(event.FLOW_CDU, savedTarget as never, target as never);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      }
    });
  }
}

export default Block;
