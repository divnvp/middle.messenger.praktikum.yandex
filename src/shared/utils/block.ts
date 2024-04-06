import EventBus from '@/shared/utils/event-bus';
import Handlebars from 'handlebars';
import { IElement } from '@/shared/models/element.interface';
import { IMeta } from '@/shared/models/meta.interface';
import { IProp } from '@/shared/models/prop.interface';
import { IPropEvent } from '@/shared/models/prop-event.interface';
import { v4 as makeUUID } from 'uuid';

export class Block {
  private readonly EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  };
  private readonly meta?: IMeta;
  protected readonly props: IProp = {};
  private readonly eventBus: () => EventBus;

  private htmlElement?: HTMLElement;
  protected id = makeUUID();
  child: IProp = {};
  array: IProp = {};

  get element() {
    return this.htmlElement;
  }

  constructor(tagName = 'div', localProps = {}) {
    const { children, props, array } = this.getChild(localProps);

    const eventBus = new EventBus();
    this.meta = {
      tagName,
      props
    };

    this.child = this.makePropsProxy(children);
    this.array = this.makePropsProxy(array);
    this.props = this.makePropsProxy({ ...props });

    this.eventBus = () => eventBus;
    this.registerEvents(eventBus);

    eventBus.emit(this.EVENTS.INIT);
  }

  init() {
    this.insertElement();
    this.eventBus().emit(this.EVENTS.FLOW_RENDER);
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(this.EVENTS.FLOW_CDM);
  }

  componentDidUpdate() {
    return true;
  }

  render() {}

  addAttributes() {
    const { attr } = this.props;

    if (attr) {
      Object.entries(attr).forEach(([key, value]) => {
        this.htmlElement?.setAttribute(key, value as string);
      });
    }
  }

  getElement() {
    return this.element;
  }

  compile(template: string, props?: IProp): DocumentFragment {
    const fragment: HTMLElement = this.createElement('template');

    if (!props) {
      props = this.props;
    }

    const propsAndStubs = { ...props };

    this.initializeUniqueElements(propsAndStubs);

    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    this.createChildComponents(fragment);
    this.createListComponent(fragment);

    return (fragment as unknown as HTMLTemplateElement).content;
  }

  hide() {}

  setProps(props: unknown) {
    Object.assign(this.child, props);
  }

  private addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach(eventName => {
      if (typeof events[eventName] === 'object') {
        // Если элемент, на который нужно навесить событие, лежит внутри других блоков вроде div и т.п.
        // Тогда в events в значение события передаем объект, где querySelector - это имя элемента внутри htmlElement
        this.htmlElement
          ?.querySelector((events[eventName] as unknown as IPropEvent).querySelector)
          ?.addEventListener(eventName, (events[eventName] as unknown as IPropEvent).event);
      } else {
        this.htmlElement?.addEventListener(
          eventName,
          (events as Record<string, EventListener>)[eventName]
        );
      }
    });
  }

  private removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach(eventName => {
      if (typeof events[eventName] === 'object') {
        this.htmlElement
          ?.querySelector((events[eventName] as unknown as IPropEvent).querySelector)
          ?.removeEventListener(eventName, (events[eventName] as unknown as IPropEvent).event);
      } else {
        this.htmlElement?.removeEventListener(eventName, events[eventName]);
      }
    });
  }

  private initializeUniqueElements(propsAndStubs: Record<string, unknown>) {
    (Object.entries(this.child) as [key: string, child: HTMLElement][]).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });

    Object.entries(this.array).forEach(([key]) => {
      propsAndStubs[key] = `<div data-id="${key}"></div>`;
    });
  }

  private createChildComponents(fragment: HTMLElement) {
    (Object.values(this.child) as (HTMLElement & IElement)[]).forEach(child => {
      const stub = (fragment as unknown as IElement).content?.querySelector(
        `[data-id="${child.id}"]`
      );

      if (stub && child.getElement) {
        stub.replaceWith(child.getElement());
      }
    });
  }

  private createListComponent(fragment: HTMLElement) {
    (Object.entries(this.array) as [key: string, child: IElement[]][]).forEach(([key, child]) => {
      const stub = (fragment as unknown as IElement).content?.querySelector(`[data-id="${key}"]`);

      if (!stub) {
        return;
      }

      const view: HTMLElement = this.createElement('template');

      (child as HTMLElement & IElement[]).forEach(item => {
        if (item instanceof Block) {
          (view as HTMLElement & IElement).content?.append((item as IElement).getElement());
        } else {
          (view as HTMLElement & IElement).content?.append(`${item}`);
        }
      });

      if ((view as HTMLElement & IElement).content) {
        stub.replaceWith((view as HTMLElement & IElement).content as string | Node);
      }
    });
  }

  private registerEvents(eventBus: EventBus) {
    eventBus.on(this.EVENTS.INIT, this.init.bind(this));
    eventBus.on(this.EVENTS.FLOW_CDM, this.localComponentDidMount.bind(this));
    eventBus.on(this.EVENTS.FLOW_RENDER, this.localRender.bind(this));
    eventBus.on(this.EVENTS.FLOW_CDU, this.localComponentDidUpdate.bind(this));
  }

  private insertElement() {
    if (this.meta) {
      const { tagName } = this.meta;
      this.htmlElement = this.createElement(tagName);
    }
  }

  private localComponentDidMount() {
    this.componentDidMount();
  }

  private localComponentDidUpdate() {
    const response = this.componentDidUpdate();

    if (response) {
      this.eventBus().emit(this.EVENTS.FLOW_RENDER);
    }
  }

  private localRender() {
    if (this.htmlElement) {
      const children = this.htmlElement.children;
      if (children) {
        for (let i = 0; i < children.length; i++) {
          this.htmlElement.removeChild(children[i]);
        }
      }
      this.removeEvents();
      this.htmlElement.appendChild(this.render() as unknown as Node);
      this.addEvents();
      this.addAttributes();
    }
  }

  private makePropsProxy = (props: IProp) => {
    const event = this.EVENTS;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, p, newValue) {
        target[p] = newValue;
        self.eventBus().emit(event.FLOW_CDU);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      }
    });
  };

  private createElement(tag: string) {
    return document.createElement(tag);
  }

  private getChild(value: IProp) {
    const children: IProp = {};
    const array: IProp = {};
    const props: IProp = {};

    Object.keys(value).forEach(key => {
      if (value[key] instanceof Block) {
        children[key] = value[key];
      } else if (Array.isArray(value[key])) {
        array[key] = value[key];
      } else {
        props[key] = value[key];
      }
    });

    return { children, props, array };
  }
}
