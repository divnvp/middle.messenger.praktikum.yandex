import store, { StoreEvents } from '@/shared/storage/store';
import { Block } from '@/shared/utils/block';
import chatItemTemplate from '@/components/chat-item/chat-item';
import { IChat } from '@/shared/models/chat.interface';

export class ChatItem extends Block {
  constructor(prop: IChat) {
    super('div', {
      events: {
        click: (e: Event) => {
          if (e) {
            store.set('currentChat', prop);
          }
        }
      },
      name: prop.title,
      message: prop.last_message,
      unread: prop.unread_count
    });

    store.on(StoreEvents.Updated, () => this.setProps(store.getState()));
  }

  override render() {
    return this.compile(chatItemTemplate);
  }
}
