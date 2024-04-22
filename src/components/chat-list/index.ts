import store, { StoreEvents } from '../../shared/storage/store';
import Block from '../../shared/utils/block';
import { ChatItem } from '../chat-item';
import { IChat } from '../../shared/models/chat.interface';
import { InputSearch } from '../input-search';
import { IState } from '../../shared/models/state.interface';
import { Menu } from '../menu';
import template from './template.hbs?raw';

interface TProps {
  chats: IChat[];
}

export class ChatList extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      currentChat: store.getState().currentChat,
      menu: new Menu()
    });

    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getState());
    });
  }

  override init() {
    this.child['search'] = new InputSearch({
      onChange: (val: Event) => {
        console.log(val.target);
      }
    });
  }

  override componentDidUpdate(_: unknown, newProps: IState): boolean {
    if (newProps.chats) {
      this.child['chatsList'] = newProps.chats?.map((data: IChat) => new ChatItem({ chat: data }));
    }
    return true;
  }

  override render() {
    return this.compile(template, this.props);
  }
}
