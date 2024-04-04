import EventBus from '@/shared/utils/event-bus';
import { IState } from '@/shared/models/state.interface';
import set from '@/shared/utils/custom-utils/set';

export enum StoreEvents {
  Updated = 'updated'
}

class Store extends EventBus {
  private state: IState = {};

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
