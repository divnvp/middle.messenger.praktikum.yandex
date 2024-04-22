import EventBus from '../utils/event-bus';
import { IChat } from '../models/chat.interface';
import { IState } from '../models/state.interface';
import { IUser } from '../models/user.interface';
import set from '../utils/custom-utils/set';

export enum StoreEvents {
  Updated = 'updated'
}

export class Store extends EventBus {
  private state: IState = {
    user: {} as IUser,
    chats: [] as IChat[],
    currentChat: {} as IChat,
    currentChatUsers: [] as IUser[]
  };

  getState() {
    return this.state;
  }

  set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
