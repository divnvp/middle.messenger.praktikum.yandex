export type Listener<T extends unknown[] = never[]> = (args: T) => void;

export default class EventBus<
  E extends string = string,
  M extends { [K in E]: unknown[] } = Record<E, never[]>
> {
  private listeners: { [K in E]?: Listener<M[E]>[] } = {};

  on(event: E, callback: Listener<M[E]>) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(callback);
  }

  off(event: E, callback: Listener<M[E]>) {
    if (!this.listeners[event]) {
      throw new Error(`No event: ${event}`);
    }
    this.listeners[event] = this.listeners[event]!.filter(listener => listener !== callback);
  }

  emit(event: E, ...args: M[E]) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event]!.forEach(listener => {
      const newArgs = [...args] as unknown as M[E];
      listener(newArgs);
    });
  }
}
